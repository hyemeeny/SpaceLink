import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

const Signup = () => {
  return (
    <section className="flex flex-col gap-6 px-5 min-w-[325px] md:w-[400px] mx-auto mt-[10vh]">
      <div className="flex flex-col gap-4 items-center">
        <h1>
          <Link href={"/"}>
            <Image src="/icons/logo.svg" width={210} height={38} alt="logo" />
          </Link>
        </h1>
        <p className="text-black text-base">
          이미 회원이신가요?
          <Link
            href={"/login"}
            className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3"
          >
            로그인 하기
          </Link>
        </p>
      </div>

      <form className="grid gap-6">
        <Input
          label="이메일"
          id="email"
          type="email"
          placeholder="test@test.com"
        />
        <Input
          label="이름"
          id="name"
          type="name"
          placeholder="이름을 입력해주세요."
        />
        <Input
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <Input
          label="비밀번호 확인"
          id="password"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
        />

        <Button height="h-[53px]">로그인</Button>
      </form>

      <div className="flex justify-between items-center py-3 px-5 bg-gray02 ring-1 ring-gray03 rounded-lg">
        <p className="text-gray05 text-sm">소설 로그인</p>
        <div className="flex gap-4">
          <Link href="#">
            <Image
              src="/icons/google.svg"
              width={42}
              height={42}
              alt="Google"
            />
          </Link>
          <Link href="#">
            <Image src="/icons/kakao.svg" width={42} height={42} alt="Kakao" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
