import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import API_URL from "@/constants/config";
import User from "@/components/Layout/header/User";
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

  return (
    <header className="relative bg-transparent flex justify-between items-center md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto p-4 md:py-8 z-10">
      <Link href={"/"}>
        {/* <Image src={"/icons/logo.svg"} width={133} height={24} alt="Linkbrary" /> */}
        <h1 className="font-pyeongChangPeace text-3xl font-bold text-purple01">우주링크</h1>
      </Link>
      {user ? (
        <User user={user} />
      ) : (
        <Link href={"/login"}>
          <CtaButton width="w-[80px] md:w-[128px]" height="h-[37px] md:h-[53px]">
            로그인
          </CtaButton>
        </Link>
      )}
    </header>
  );
};

export default Header;
