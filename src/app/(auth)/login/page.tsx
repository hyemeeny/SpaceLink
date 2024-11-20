"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/CtaButton";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마 정의
const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { login, isPending, isError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // console.log(data);
      // const response = await axios.post("/api/auth/sign-in", data);
      // console.log("로그인 성공", response);
      await login(data);
      router.push("/");
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
    }
  };

  return (
    <section className="flex flex-col gap-6 px-5 min-w-[325px] md:w-[400px] mx-auto mt-[10vh]">
      <div className="flex flex-col gap-4 items-center">
        <h1>
          <Link href={"/"}>
            <Image src="/icons/logo.svg" width={210} height={38} alt="logo" />
          </Link>
        </h1>
        <p className="text-black text-base">
          회원이 아니신가요?
          <Link href={"/signup"} className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3">
            회원 가입하기
          </Link>
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input label="이메일" id="email" type="email" placeholder="test@test.com" errors={errors.email?.message} {...register("email")} />
        <Input
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

      <div className="flex justify-between items-center py-3 px-5 bg-gray02 ring-1 ring-gray03 rounded-lg">
        <p className="text-gray05 text-sm">소설 로그인</p>
        <div className="flex gap-4">
          <Link href="#">
            <Image src="/icons/google.svg" width={42} height={42} alt="Google" />
          </Link>
          <Link href="#">
            <Image src="/icons/kakao.svg" width={42} height={42} alt="Kakao" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
