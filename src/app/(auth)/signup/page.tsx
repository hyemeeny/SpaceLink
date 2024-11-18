"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import axios from "axios";

// 비밀번호 조건 정규표현식
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마 정의
const SignupSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    console.log("폼 제출 데이터", data);

    try {
      console.log("API 요청 데이터", data);
      const response = await axios.post("/api/auth/sign-up", data);
      console.log("회원가입 성공", response);
      router.push("/login");
    } catch (error) {
      console.error("회원가입에 실패하였습니다.", error);
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
          이미 회원이신가요?
          <Link
            href={"/login"}
            className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3"
          >
            로그인 하기
          </Link>
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="이메일"
          id="email"
          type="email"
          placeholder="test@test.com"
          errors={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="이름"
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
          errors={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          errors={errors.password?.message}
          {...register("password")}
        />
        {/* <Input
          label="비밀번호 확인"
          id="password"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          errors={errors.password?.message}
          {...register("password")}
        /> */}

        <Button type="submit" height="h-[53px]" disabled={!isValid}>
          회원가입
        </Button>
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

export default SignupPage;
