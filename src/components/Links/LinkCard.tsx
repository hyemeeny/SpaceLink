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
import UpdateModal from "@/components/Modal/components/UpdateModal";
import DeleteModal from "@/components/Modal/components/DeleteModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { GoKebabHorizontal } from "react-icons/go";
import { FaRegStar, FaStar } from "react-icons/fa";

// 상대 시간 표시 (Hydration 오류 방지)
const RelativeTimeComponent = ({ timestamp }: { timestamp: string }) => {
  const [relativeTime, setRelativeTime] = useState<string>("");

  useEffect(() => {
    setRelativeTime(formatRelativeTime(timestamp));
  }, [timestamp]);

  return <span>{relativeTime}</span>;
};

const LinkCard = ({ link }: { link: LinkType }) => {
  const { openModals, openModal } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(link.favorite);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const [imageSrc, setImageSrc] = useState(link.imageSource || "/images/none_image.svg");

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleFavoriteClick = async () => {
    const newFavoriteState = !favorite;
    try {
      await putFavoriteLinks({ favorite: newFavoriteState, linkId: link.id });
      setFavorite(newFavoriteState);
      toast.success(newFavoriteState ? toastMessages.success.favoriteLink : toastMessages.success.unfavoriteLink);
    } catch (error) {
      toast.error(toastMessages.error.favoriteLink);
    }
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
          <Image
            src={imageSrc}
            fill
            alt={link.title}
            className="object-cover"
            priority
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>

      <button
        onClick={handleFavoriteClick}
        className="absolute top-4 right-4 text-2xl"
        aria-label={favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        {favorite ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray04" />}
      </button>

      <div className="relative p-4 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <p className="text-gray02 text-sm">
            <RelativeTimeComponent timestamp={link.createdAt} />
          </p>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative w-[21px] h-[17px]"
            aria-label="메뉴 열기"
            aria-expanded={isOpen}
          >
            <GoKebabHorizontal />
          </button>

          <Dropdown
            items={["수정하기", "삭제하기"]}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={(item) => openModal(`${item === "수정하기" ? "linkUpdate" : "linkDelete"}-${link.id}`)}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-overflow">{link.title}</h3>
          <p className="text-base text-overflow2">{link.description}</p>
        </div>

        <p className="text-gray02 text-sm">{formatDate(link.createdAt)}</p>
      </div>

      {/* 링크 수정 모달 */}
      {openModals.has(`linkUpdate-${link.id}`) && (
        <UpdateModal selectedItem={link} itemType="link" defaultName={link.url} />
      )}

      {/* 링크 삭제 모달 */}
      {openModals.has(`linkDelete-${link.id}`) && <DeleteModal selectedItem={link} itemType="link" />}
    </li>
  );
};

export default LinkCard;
