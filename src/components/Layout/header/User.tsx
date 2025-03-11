"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/auth";
import { logout } from "@/actions/auth";
import Image from "next/image";
import Dropdown from "@/components/Dropdown/Dropdown";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FaStar, FaUserMinus } from "react-icons/fa";

const menuItems = [
  { label: "즐겨찾기", value: "즐겨찾기", icon: <FaStar color="#facc15" size={20} /> },
  { label: "로그아웃", value: "로그아웃", icon: <FaUserMinus color="#d4bcff" size={20} /> },
];

const User = ({ user }: { user: UserProps | null }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleItemClick = async (item: string) => {
    if (item === "즐겨찾기") {
      router.push("/favorite");
    } else if (item === "로그아웃") {
      await logout();
      router.push("/login");
    }
  };

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {user && (
        <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
          <Image src={"/icons/profile.svg"} width={30} height={30} alt={user.name} className="ml-3" />
          <p className="text-sm">{user.name}</p>
          <Dropdown
            items={menuItems}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onItemClick={(item) => handleItemClick(item)}
          />
        </div>
      )}
    </div>
  );
};

export default User;
