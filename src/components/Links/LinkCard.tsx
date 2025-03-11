"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { putFavoriteLinks } from "@/actions/links";
import { LinkType } from "@/types/links";
import { useModalStore } from "@/store/useModalStore";
import { formatDate, formatRelativeTime } from "@/utils/dateFormat";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import Dropdown from "@/components/Dropdown/Dropdown";
import UpdateModal from "@/components/Modal/UpdateModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegStar, FaStar } from "react-icons/fa";

// 하이드레이션(hydration) 오류
export const RelativeTimeComponent = ({ timestamp }: { timestamp: string }) => {
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    // 클라이언트에서만 시간 계산
    const relative = formatRelativeTime(timestamp);
    setRelativeTime(relative);
  }, [timestamp]);

  return <span>{relativeTime}</span>;
};

const menuItems = [
  { label: "수정하기", value: "수정하기" },
  { label: "삭제하기", value: "삭제하기" },
];

const LinkCard = ({ link }: { link: LinkType }) => {
  const { openModals, openModal } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);
  const [favorite, setFavorite] = useState(link.favorite);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [imageSrc, setImageSrc] = useState(link.imageSource || "/images/none_image.svg");

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = (item: string, link: LinkType) => {
    if (item === "수정하기") {
      handleEditClick(link);
    } else if (item === "삭제하기") {
      handleDeleteClick(link);
    }
  };

  const handleFavoriteClick = async (id: number) => {
    const newFavoriteState = !favorite;
    try {
      await putFavoriteLinks({ favorite: newFavoriteState, linkId: id });
      setFavorite(newFavoriteState);
      toast.success(newFavoriteState ? toastMessages.success.favoriteLink : toastMessages.success.unfavoriteLink);
    } catch (error) {
      toast.error(toastMessages.error.favoriteLink);
    }
  };

  const handleEditClick = (link: LinkType) => {
    setSelectedLink(link);
    openModal(`linkUpdate-${link.id}`);
  };

  const handleDeleteClick = (link: LinkType) => {
    setSelectedLink(link);
    openModal(`linkDelete-${link.id}`);
  };

  const handleImageError = () => {
    setImageSrc("/images/none_image.svg");
  };

  return (
    <li
      key={link.id}
      className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-custom bg-white bg-opacity-20"
      ref={dropdownRef}
    >
      <Link href={link.url} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full h-[192px] md:h-[200px]">
          <Image src={imageSrc} fill alt={link.title} className="object-cover" onError={handleImageError} />
        </div>
      </Link>
      <button onClick={() => handleFavoriteClick(link.id)} className="absolute top-4 right-4 text-2xl">
        {favorite ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray04" />}
      </button>
      <div className="relative p-4 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <p className="text-gray02 text-sm">{RelativeTimeComponent({ timestamp: link.createdAt })}</p>
          <button onClick={toggleDropdown} className="relative w-[21px] h-[17px]">
            <GoKebabHorizontal />
          </button>

          <Dropdown
            items={menuItems}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={(item) => handleItemClick(item, link)}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-overflow">{link.title}</h3>
          <p className="text-base text-overflow2">{link.description}</p>
        </div>
        <p className="text-gray02 text-sm">{formatDate(link.createdAt)}</p>
      </div>

      {/* 링크 수정 모달 */}
      {selectedLink && openModals.has(`linkUpdate-${selectedLink.id}`) && (
        <UpdateModal selectedItem={selectedLink} itemType="link" defaultName={selectedLink.url} />
      )}

      {/* 링크 삭제 모달 */}
      {selectedLink && openModals.has(`linkDelete-${selectedLink.id}`) && (
        <DeleteModal selectedItem={selectedLink} itemType="link" />
      )}
    </li>
  );
};

export default LinkCard;
