"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { LoginSchema, LoginFormValues } from "@/schema/zodSchema";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      router.push("/");
      toast.success(toastMessages.success.login);
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
      toast.error(toastMessages.error.login);
    }
  };

  return (
    <section className="flex flex-col gap-6 px-5 min-w-[325px] md:w-[500px] mx-auto py-[10vh]">
      <h1 className="text-white text-center text-2xl md:text-4xl font-semibold m-auto mb-12">로그인</h1>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="이메일"
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          errors={errors.email?.message}
          {...register("email")}
        />
        <BaseInput
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          errors={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" height="h-[53px]" disabled={!isValid}>
          로그인
        </Button>
      </form>

      <p className="text-white text-base text-center">
        아직 계정이 없으신가요?
        <Link href={"/signup"} className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3">
          가입하기
        </Link>
      </p>

      <div className="flex flex-col">
        <div className="mt-8 flex w-full items-center">
          <hr className="flex-1 border-t border-border-primary" />
          <span className="mx-8 text-xl text-white">OR</span>
          <hr className="flex-1 border-t border-border-primary" />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white text-base">간편 로그인하기</p>
          <div className="flex gap-4">
            <Link href="#">
              <Image src="/icons/google.svg" width={42} height={42} alt="Google" />
            </Link>
            <Link href="#">
              <Image src="/icons/kakao.svg" width={42} height={42} alt="Kakao" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
