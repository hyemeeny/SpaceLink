import Link from "next/link";
import { useState } from "react";
import { LinkType } from "@/types/links";
import Image from "next/image";
import Dropdown from "@/components/Dropdown/Dropdown";
import { GoKebabHorizontal } from "react-icons/go";
import { formatDate, formatRelativeTime } from "@/utils/dateFormat";

const LinkCard = ({ link }: { link: LinkType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {};

  return (
    <li
      key={link.id}
      className="mx-auto w-full md:w-[340px] rounded-2xl overflow-hidden shadow-custom bg-white;
"
    >
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
          {isOpen && <Dropdown />}
        </div>
        <div>
          <h3 className="text-base font-semibold">{link.title}</h3>
          <p className="text-overflow text-base">{link.description}</p>
        </div>
        <p className="text-gray07 text-sm">{formatDate(link.createdAt)}</p>
      </div>
    </li>
  );
};

export default LinkCard;
