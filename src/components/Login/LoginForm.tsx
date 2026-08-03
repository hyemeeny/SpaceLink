"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValues } from "@/schema/zodSchema";
import { loginAction } from "@/actions/auth";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

const GUEST_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
  password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
};

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isGuestPending, setIsGuestPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleLogin = async (formData: LoginFormValues, setLoading: (v: boolean) => void) => {
    setLoading(true);

    const result = await loginAction(formData);

    if (result?.success === false) {
      toast.error(result.message || toastMessages.error.login);
      setLoading(false);
    }
  };

  const onSubmit = (data: LoginFormValues) => {
    handleLogin(data, setIsPending);
  };

  const onGuestSubmit = () => {
    handleLogin(GUEST_CREDENTIALS, setIsGuestPending);
  };

  return (
    <FormContainer
      title="로그인"
      text="아직 계정이 없으신가요?"
      link="/signup"
      linkTitle="가입하기"
      easyTitle="간편 로그인하기"
    >
      <form className="grid gap-4 md:gap-6" onSubmit={handleSubmit(onSubmit)}>
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
        <CtaButton type="submit" size="large" disabled={!isValid || isPending}>
          {isPending ? <LoadingSpinner /> : "로그인"}
        </CtaButton>
        <CtaButton size="large" onClick={onGuestSubmit} disabled={isGuestPending}>
          {isGuestPending ? <LoadingSpinner /> : "게스트로 체험하기"}
        </CtaButton>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
