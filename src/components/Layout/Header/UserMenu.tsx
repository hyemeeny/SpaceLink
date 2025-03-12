"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserProps } from "@/types/auth";
import { logout } from "@/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { FiLink, FiStar, FiLogOut } from "react-icons/fi";

const UserMenu = ({ user }: { user: UserProps | null }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    setIsOpen(false);
  };

  const menuIcon = "bg-white w-6 h-[2px] rounded transition-all duration-300";
  const navLinkBase =
    "flex items-center gap-3 w-full text-base cursor-pointer px-4 py-3 rounded-md hover:bg-purple01 transition duration-300 ease-in-out";
  const activeStyle = "bg-purple01";

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {user && (
        <div className="relative flex items-center gap-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Image src={"/icons/profile.svg"} width={30} height={30} alt={user.name} className="ml-3" />
          <p className="text-xl">{user.name}</p>

          <button
            className="flex flex-col justify-center items-center w-10 h-10 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={clsx(menuIcon, "absolute", isOpen ? "rotate-45 top-1/2" : "-translate-y-2")} />
            <div className={clsx(menuIcon, isOpen ? "opacity-0" : "opacity-100")} />
            <div className={clsx(menuIcon, "absolute", isOpen ? "-rotate-45 top-1/2" : "translate-y-2")} />
          </button>

          {isOpen && (
            <nav className="flex flex-col gap-2 w-60 absolute top-2 right-0 mt-10 p-2 rounded-xl shadow-custom bg-black02 bg-opacity-50 overflow-hidden">
              <Link href="/links" className={clsx(navLinkBase, pathname === "/links" ? activeStyle : "")}>
                <FiLink className="size-5" /> 링크 보관소
              </Link>
              <Link href="/favorite" className={clsx(navLinkBase, pathname === "/favorite" ? activeStyle : "")}>
                <FiStar className="size-5" /> 즐겨찾기
              </Link>
              <hr className="border-purple02 mx-2" />
              <button onClick={handleLogout} className={clsx(navLinkBase)}>
                <FiLogOut className="size-5" /> 로그아웃
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
