"use client";

import Image from "next/image";
import Button from "../Button";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const { data: user, isPending, isError } = useUser();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>오류 페이지입니다.</div>;

  return (
    <header className="bg-gray03 flex justify-between px-5 py-3">
      <Link href={"/"}>
        <Image src={"/icons/logo.svg"} width={133} height={24} alt="Linkbrary" />
      </Link>
      <Link href={"/login"}>
        <Button width="w-[80px] md:w-[128px]" height="h-[37px] md:h-[53px]">
          로그인
        </Button>
      </Link>
      {user && (
        <div>
          <Link href={"/favorite"}>
            <button>즐겨찾기</button>
          </Link>
          <Image src={"/icons/profile.svg"} width={28} height={28} alt="user" />
          <p></p>
        </div>
      )}
    </header>
  );
};

export default Header;
