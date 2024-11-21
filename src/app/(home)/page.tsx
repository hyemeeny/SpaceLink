import CtaButton from "@/components/Button/CtaButton";
import Container from "@/components/Layout/Container";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Container>
        <Link href={"/links"}>
          <CtaButton width="w-[350px]" height="h-[53px]">
            링크 추가하기
          </CtaButton>
        </Link>
      </Container>
    </main>
  );
}
