import { redirect } from "next/navigation";
import { Suspense } from "react";
import getUser from "@/services/server/getUser";
import LinksDataBoundary from "@/components/Links/LinksDataBoundary";
import LinksSkeleton from "@/components/Links/LinksSkeleton";
import Container from "@/components/Layout/Container";
import LinkInput from "@/components/Input/LinkInput";

interface LinksPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const metadata = {
  title: "링크 페이지 | SPACELINK",
};

const LinksPage = async ({ searchParams }: LinksPageProps) => {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <Container className="mt-10 mb-20 pb-8 md:pb-32 flex flex-col gap-6">
      <LinkInput />
      <Suspense fallback={<LinksSkeleton />}>
        <LinksDataBoundary search={searchParams.search} />
      </Suspense>
    </Container>
  );
};

export default LinksPage;
