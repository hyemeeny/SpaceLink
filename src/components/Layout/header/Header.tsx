import { cookies } from "next/headers";
import Link from "next/link";
import API_URL from "@/constants/config";
import User from "@/components/Layout/Header/User";
import CtaButton from "@/components/Button/CtaButton";
import Image from "next/image";

const getUser = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
    });

    if (!response.ok) {
      return null;
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error("유저 정보 조회 실패", error);
    return null;
  }
};

const Header = async () => {
  const user = await getUser();

  return (
    <header className="relative bg-transparent flex justify-between items-center md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto p-4 md:py-8 z-10">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/icons/saturn.png"
          width={60}
          height={60}
          alt="SpaceLink"
          className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
        />
        <h1 className="font-pyeongChangPeace text-xl md:text-3xl font-bold text-purple01">SpaceLink</h1>
      </Link>
      {user ? (
        <User user={user} />
      ) : (
        <Link href={"/login"}>
          <CtaButton width="w-[70px] md:w-[128px]" height="h-[27px] md:h-[53px]">
            로그인
          </CtaButton>
        </Link>
      )}
    </header>
  );
};

export default Header;
