import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import API_URL from "@/constants/config";
import UserMenu from "@/components/Layout/Header/UserMenu";
import Container from "@/components/Layout/Container";
import CtaButton from "@/components/Button/CtaButton";

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
      cache: "no-store",
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
    <header>
      <Container className="relative bg-transparent flex justify-between items-center mx-auto py-4 md:py-8 z-10">
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
          <UserMenu user={user} />
        ) : (
          <Link href={"/login"}>
            <CtaButton>로그인</CtaButton>
          </Link>
        )}
      </Container>
    </header>
  );
};

export default Header;
