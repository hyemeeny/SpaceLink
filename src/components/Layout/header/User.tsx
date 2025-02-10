"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProps } from "@/types/auth";
import { logout } from "@/actions/auth";
import Link from "next/link";
import Image from "next/image";
import Dropdown from "@/components/Dropdown/Dropdown";
import FolderButton from "@/components/Button/FolderButton";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const User = ({ user }: { user: UserProps | null }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      <Link href={"/favorite"}>
        <FolderButton>⭐ 즐겨찾기</FolderButton>
      </Link>
      {user && (
        <div className="relative flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
          <Image src={"/icons/profile.svg"} width={28} height={28} alt={user.name} className="ml-3" />
          <p className="text-sm text-gray06">{user.name}</p>
          <Dropdown items={["로그아웃"]} isOpen={isOpen} onClose={() => setIsOpen(false)} onItemClick={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default User;
