import { cookies } from "next/headers";
import { LinkType } from "@/types/links";
import API_URL from "@/constants/config";
import Container from "@/components/Layout/Container";
import LinkCard from "@/components/Links/LinkCard";

interface getFavoriteLinksParams {
  page: number;
  pageSize: number;
}

// 즐겨찾기 링크 조회
const getFavoriteLinks = async ({ page, pageSize }: getFavoriteLinksParams) => {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("인증 정보가 유효하지 않습니다.");
  }

  try {
    const response = await fetch(`${API_URL}/favorites?page=${page}&pageSize=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["links"] },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return {
      totalCount: data?.totalCount || 0,
      list: data?.list || [],
    };
  } catch (error) {
    console.error("즐겨찾기 링크 조회 중 에러 발생", error);
    return { totalCount: 0, list: [] };
  }
};

const favoritePage = async () => {
  const { totalCount, list } = await getFavoriteLinks({ page: 1, pageSize: 10 });

  return (
    <Container>
      <div>
        {list && list.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
            {list.map((link: LinkType) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </ul>
        ) : (
          <p className="">즐겨찾기 된 링크가 없습니다.</p>
        )}
      </div>
    </Container>
  );
};

export default favoritePage;
