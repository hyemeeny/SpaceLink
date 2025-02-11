import Link from "next/link";
import { useEffect, useState } from "react";
import { LinkType } from "@/types/links";
import Image from "next/image";
import Dropdown from "@/components/Dropdown/Dropdown";
import { GoKebabHorizontal } from "react-icons/go";
import { formatDate, formatRelativeTime } from "@/utils/dateFormat";
import { useModalStore } from "@/store/useModalStore";
import LinkUpdateModal from "../Modal/LinkModal/LinkUpdateModal";
import DeleteModal from "../Modal/components/DeleteModal";
import UpdateModal from "../Modal/components/UpdateModal";

const LinkCard = ({ link }: { link: LinkType }) => {
  const { openModals, openModal, closeModal } = useModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkType | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // console.log("Link 값:", link);
  // console.log("selectedLink 값:", selectedLink);

  // const handleEditClick = async (id: number, link: LinkType) => {
  //   setlinkId(id);
  //   setSelectedLink(link);

  //   openModal("updateLink");
  //   console.log("선택한 selectedLink 값:", selectedLink);
  // };

  // 수정 버튼 클릭 시 실행될 함수
  const handleEditClick = (link: LinkType) => {
    setSelectedLink(link);
    openModal(`linkUpdate-${link.id}`); // 먼저 selectedLink 설정
  };

  const handleDeleteClick = (link: LinkType) => {
    setSelectedLink(link);
    openModal(`linkDelete-${link.id}`);
  };

  // const handleCloseModal = () => {
  //   setSelectedLink(null); // 먼저 selectedLink 설정
  // };

  // // selectedLink 값이 변경되면 모달을 열도록 useEffect로 관리
  // useEffect(() => {
  //   if (selectedLink) {
  //     openModal("updateLink");
  //   }
  // }, [selectedLink, openModal]); // selectedLink가 변경될 때마다 실행

  return (
    <li key={link.id} className="mx-auto w-full md:w-[340px] rounded-2xl overflow-hidden shadow-custom bg-white">
      <Link href={link.url}>
        <div className="relative w-full h-[192px] md:w-[340px] md:h-[200px]">
          <Image src={link.imageSource || "/images/none_image.svg"} fill alt={link.title} className="object-cover" />
        </div>
      </Link>
      <div className="relative p-4 flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <p className="text-gray07 text-sm">{formatRelativeTime(link.createdAt)}</p>
          <button onClick={toggleDropdown} className="relative w-[21px] h-[17px]">
            <GoKebabHorizontal />
          </button>

          <button onClick={() => handleEditClick(link)}>수정</button>
          <button onClick={() => handleDeleteClick(link)}>삭제</button>

          {/* <Dropdown
            items={["수정하기", "삭제하기"]}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={handleItemClick}
          /> */}
        </div>
        <div>
          <h3 className="text-base font-semibold">{link.title}</h3>
          <p className="text-overflow text-base">{link.description}</p>
        </div>
        <p className="text-gray07 text-sm">{formatDate(link.createdAt)}</p>
      </div>

      {/* 링크 수정 모달 */}
      {selectedLink && openModals.has(`linkUpdate-${selectedLink.id}`) && (
        <UpdateModal
          selectedItem={selectedLink}
          closeModal={closeModal}
          itemType="link"
          defaultName={selectedLink.url}
        />
      )}

      {/* 링크 삭제 모달 */}
      {selectedLink && openModals.has(`linkDelete-${selectedLink.id}`) && (
        <DeleteModal selectedItem={selectedLink} closeModal={closeModal} itemType="link" />
      )}
    </li>
  );
};

export default LinkCard;
