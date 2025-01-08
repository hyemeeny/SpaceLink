"use client";

import Image from "next/image";
import Button from "../Button/CtaButton";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import FolderButton from "../Button/FolderButton";
import Dropdown from "../Dropdown/Dropdown";
import { useState } from "react";
import axios from "axios";

const Header = () => {
  const { user, isPending, isError, login, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/signup"];
  if (hideHeaderRoutes.includes(pathname)) return null;

  // 사용자 데이터를 로딩 중일 때 빈 상태로 유지
  // if (isPending) {
  //   return (
  //     <header className="bg-gray03 flex justify-between items-center px-5 py-3">
  //       <div className="w-[133px] h-[24px] bg-gray-200 animate-pulse"></div>
  //       <div className="w-[80px] h-[37px] bg-gray-200 animate-pulse"></div>
  //     </header>
  //   );
  // }

  // 사용자 데이터를 불러오는 데 실패했을 때
  // if (isError) {
  //   return (
  //     <header className="bg-gray03 flex justify-between items-center px-5 py-3">
  //       <Link href={"/"}>
  //         <Image src={"/icons/logo.svg"} width={133} height={24} alt="Linkbrary" />
  //       </Link>
  //       <p className="text-red-500">유저 정보를 가져오지 못했습니다.</p>
  //     </header>
  //   );
  // }

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-gray01 flex justify-between items-center px-5 py-4 md:py-8">
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} width={133} height={24} alt="Linkbrary" />
      </Link>
      {user ? (
        <div className="flex items-center gap-2">
          <Link href={"/favorite"}>
            <FolderButton>⭐ 즐겨찾기</FolderButton>
          </Link>
          <div className="relative flex items-center gap-2" onClick={toggleDropdown}>
            <Image src={"/icons/profile.svg"} width={28} height={28} alt={user.name} className="ml-3" />
            <p className="text-sm text-gray06">{user.name}</p>

            {isDropdownOpen && (
              <div className="absolute top-8">
                <button onClick={() => logout()}>로그아웃</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href={"/login"}>
          <Button width="w-[80px] md:w-[128px]" height="h-[37px] md:h-[53px]">
            로그인
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
