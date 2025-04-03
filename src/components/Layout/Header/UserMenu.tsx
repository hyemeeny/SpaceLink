"use client";

import { useRef, useState } from "react";
import { UserProps } from "@/types/auth";
import clsx from "clsx";
import Image from "next/image";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import MenuLinks from "@/components/Layout/Header/MenuLinks";

const UserMenu = ({ user }: { user: UserProps | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const menuIcon = "bg-white w-5 h-[1px] md:w-6 md:h-[2px] rounded transition-all duration-300";

  return (
    <div className="flex items-center gap-2" ref={dropdownRef}>
      {user && (
        <div className="relative flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="size-5 md:size-8">
            <Image src={"/icons/profile.svg"} width={32} height={32} alt={user.name} />
          </div>
          <p className="text-sm md:text-xl">{user.name}</p>

          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex flex-col justify-center items-center size-8 md:size-10 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={clsx(menuIcon, "absolute", isOpen ? "rotate-45 top-1/2" : "-translate-y-2")} />
            <div className={clsx(menuIcon, isOpen ? "opacity-0" : "opacity-100")} />
            <div className={clsx(menuIcon, "absolute", isOpen ? "-rotate-45 top-1/2" : "translate-y-2")} />
          </button>

          {/* 데스크탑 */}
          {isOpen && (
            <nav className="hidden md:flex flex-col gap-2 w-60 absolute top-2 right-0 mt-10 p-2 rounded-xl shadow-custom bg-black02 bg-opacity-70 overflow-hidden">
              <MenuLinks />
            </nav>
          )}

          {/* 모바일 */}
          {isOpen && (
            <>
              <div
                className={clsx(
                  "fixed md:hidden top-0 right-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300",
                  isOpen ? "opacity-100 visible" : "opacity-0 invisible",
                )}
              />

              <nav
                className={clsx(
                  "fixed md:hidden top-0 right-0 h-full w-3/4 max-w-xs bg-black02 shadow-lg transform transition-transform duration-300",
                  isOpen ? "translate-x-0" : "translate-x-full",
                )}
              >
                <div className="pt-16 px-2">
                  <MenuLinks setIsOpen={setIsOpen} />
                </div>
              </nav>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
