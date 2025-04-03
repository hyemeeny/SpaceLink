import { cookies } from "next/headers";
import { PageParams, LinkType } from "@/types/links";
import API_URL from "@/constants/config";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Links/LinkCard";
import LinkNone from "@/components/Links/LinkNone";
import Pagination from "@/components/Button/Pagination";
import TopButton from "@/components/Button/TopButton";
import BackButton from "@/components/Button/BackButton";
import { FaStar } from "react-icons/fa";

const getUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const response = await fetch(`${API_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("유저 정보를 가져오지 못했습니다.");

    return response.json();
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    return null;
  }
};

// 즐겨찾기 링크 조회
const getFavoriteLinks = async ({ page, pageSize }: PageParams) => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) return { totalCount: 0, list: [] };

  try {
    const response = await fetch(`${API_URL}/favorites?page=${page}&pageSize=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["favorite"] },
    });

    if (!response.ok) throw new Error("즐겨찾기 링크를 가져오지 못했습니다.");

    return response.json();
  } catch (error) {
    console.error("즐겨찾기 링크 조회 중 에러 발생:", error);
    return { totalCount: 0, list: [] };
  }
};

const favoritePage = async ({ searchParams }: { searchParams: PageParams }) => {
  const page = Number(searchParams.page) || 1;
  const pageSize = Number(searchParams.pageSize) || 9;

  const [user, { totalCount, list }] = await Promise.all([getUser(), getFavoriteLinks({ page, pageSize })]);

  return (
    <>
      <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col items-center gap-6">
        <h2 className="flex items-center gap-2 text-2xl md:text-4xl lg:text-5xl mb-12">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{user?.name ?? "사용자"}</span>의 즐겨찾기
        </h2>
        <BackButton />
        <div>
          {list.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
              {list.map((link: LinkType) => (
                <LinkCard key={link.id} link={link} />
              ))}
            </ul>
          ) : (
            <LinkNone>즐겨찾기한 링크가 없습니다.</LinkNone>
          )}
        </div>

        {list.length > 0 && <Pagination totalCount={totalCount} currentPage={page} pageSize={pageSize} />}
      </Container>

      <TopButton />
    </>
  );
};

export default favoritePage;
