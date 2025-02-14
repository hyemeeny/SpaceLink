import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LinkType } from "@/types/links";
import { GoKebabHorizontal } from "react-icons/go";
import { formatDate, formatRelativeTime } from "@/utils/dateFormat";
import { useModalStore } from "@/store/useModalStore";
import Dropdown from "@/components/Dropdown/Dropdown";
import UpdateModal from "@/components/Modal/UpdateModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import useOnClickOutside from "@/hooks/useOnClickOutside";

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

const LinkCard = ({ link }: { link: LinkType }) => {
  const { openModals, openModal } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = (item: string, link: LinkType) => {
    if (item === "수정하기") {
      handleEditClick(link);
    } else if (item === "삭제하기") {
      handleDeleteClick(link);
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

  return (
    <li
      key={link.id}
      className="mx-auto w-full md:w-[340px] rounded-2xl overflow-hidden shadow-custom bg-white"
      ref={dropdownRef}
    >
      <Link href={link.url}>
        <div className="relative w-full h-[192px] md:w-[340px] md:h-[200px]">
          <Image src={link.imageSource || "/images/none_image.svg"} fill alt={link.title} className="object-cover" />
        </div>
      </Link>
      <div className="relative p-4 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <p className="text-gray07 text-sm">{RelativeTimeComponent({ timestamp: link.createdAt })}</p>
          <button onClick={toggleDropdown} className="relative w-[21px] h-[17px]">
            <GoKebabHorizontal />
          </button>

          <Dropdown
            items={["수정하기", "삭제하기"]}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={(item) => handleItemClick(item, link)}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold">{link.title}</h3>
          <p className="text-overflow text-base">{link.description}</p>
        </div>
        <p className="text-gray07 text-sm">{formatDate(link.createdAt)}</p>
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
