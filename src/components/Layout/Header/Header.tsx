import Link from "next/link";
import Image from "next/image";
import UserMenu from "@/components/Layout/Header/UserMenu";
import Container from "@/components/Layout/Container";
import CtaButton from "@/components/Button/CtaButton";
import getUser from "@/services/server/getUser";

const Header = async () => {
  const user = await getUser();

  return (
    <header>
      <Container className="relative bg-transparent flex justify-between items-center mx-auto py-4 md:py-8 z-10">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icons/saturn.png"
            width={60}
            height={60}
            alt="saturn icon"
            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px]"
            aria-hidden="true"
          />
          <h1 className="font-pyeongChangPeace text-xl md:text-3xl font-bold text-purple01">SpaceLink</h1>
        </Link>

        {user ? <UserMenu user={user} /> : <CtaButton url="/login">로그인</CtaButton>}
      </Container>
    </header>
  );
};

export default Header;
