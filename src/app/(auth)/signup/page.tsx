"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupFormValues } from "@/schema/zodSchema";
import { checkEmail, signUp } from "@/actions/auth";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/CtaButton";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const SignupPage = () => {
  const router = useRouter();
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  const handleCheckEmail = async () => {
    const email = watch("email");

    if (!email) {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    try {
      const response = await checkEmail({ email });

      if (!response) {
        toast.error(toastMessages.error.checkEmail);
        return;
      }

      if (response.isUsableEmail) {
        toast.success(toastMessages.success.checkEmail);
      } else if (response.message) {
        setFocus("email");
        setIsCheckEmail(false);
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(toastMessages.error.checkEmail);
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await signUp(data);

      if (response && response.message) {
        toast.error(response.message);
      } else {
        toast.success(toastMessages.success.signUp);
        router.push("/login");
      }
    } catch (error) {
      toast.error(toastMessages.error.signUp);
    }
  };

  return (
    <section className="flex flex-col gap-6 px-5 min-w-[325px] md:w-[500px] mx-auto py-[10vh]">
      <h1 className="text-white text-center text-2xl md:text-4xl font-semibold m-auto mb-12">회원가입</h1>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-center">
          <BaseInput
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            className="flex-1"
            errors={errors.email?.message}
            {...register("email")}
          />
          <CtaButton className="mt-8" disabled={isCheckEmail} onClick={handleCheckEmail}>
            {isCheckEmail ? <LoadingSpinner /> : "중복확인"}
          </CtaButton>
        </div>
        <BaseInput
          label="닉네임"
          id="name"
          type="name"
          placeholder="닉네임을 입력해주세요."
          errors={errors.name?.message}
          {...register("name")}
        />
        <BaseInput
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          errors={errors.password?.message}
          {...register("password")}
        />
        <BaseInput
          label="비밀번호 확인"
          id="confirmPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          errors={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" size="large" disabled={!isValid}>
          회원가입
        </Button>
      </form>

      <p className="text-white text-base text-center">
        이미 계정이 있으신가요?
        <Link href={"/login"} className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3">
          로그인하기
        </Link>
      </p>

      <div className="flex flex-col">
        <div className="mt-8 flex w-full items-center">
          <hr className="flex-1 border-t border-border-primary" />
          <span className="mx-8 text-xl text-white">OR</span>
          <hr className="flex-1 border-t border-border-primary" />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white text-base">간편 회원가입하기</p>
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

export default SignupPage;
