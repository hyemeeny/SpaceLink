"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkEmail, signUp } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import Button from "@/components/Button/CtaButton";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckEmail, setIsCheckEmail] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
  });

  const email = watch("email");

  const handleCheckEmail = useCallback(async () => {
    setIsCheckEmail(false);
    setIsLoading(true);

    try {
      const status = await checkEmail({ email });

      if (status === 200) {
        setIsCheckEmail(true);
      } else if (status === 409) {
        setFocus("email");
        setIsCheckEmail(false);
        setError("email", {
          type: "manual",
          message: "이미 사용 중인 이메일입니다.",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "이메일 확인 중 문제가 발생했습니다.",
        });
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "알 수 없는 오류가 발생했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, setFocus, setError]);

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
    <FormContainer
      title="회원가입"
      text="이미 계정이 있으신가요?"
      link="/login"
      linkTitle="로그인하기"
      easyTitle="간편 회원가입하기"
    >
      <form className="grid gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-start">
          <BaseInput
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            className="flex-1"
            errors={errors.email?.message}
            successMessage={isCheckEmail ? "사용 가능한 이메일입니다." : ""}
            {...register("email")}
          />
          <CtaButton className="mt-[32px] md:mt-[34px]" disabled={isLoading} onClick={handleCheckEmail}>
            {isLoading ? <LoadingSpinner /> : "중복확인"}
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
    </FormContainer>
  );
};

export default SignupPage;
