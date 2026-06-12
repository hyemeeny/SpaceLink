"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useLogin } from "@/services/auth/hooks";

const GUEST_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
  password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
};

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const { mutate: guestLogin, isPending: isGuestPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleLogin = (payload: LoginFormValues, mutationFn = login) => {
    mutationFn(payload, {
      onSuccess: () => {
        toast.success(toastMessages.success.login);
        window.location.href = "/links";
      },
      onError: (error) => {
        toast.error(error.message || toastMessages.error.login);
      },
    });
  };

  const onSubmit = (data: LoginFormValues) => {
    handleLogin(data);
  };

  const onGuestSubmit = () => {
    handleLogin(GUEST_CREDENTIALS, guestLogin);
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

        {/* 게스트 로그인 */}
        <CtaButton size="large" onClick={onGuestSubmit} disabled={isGuestPending}>
          {isGuestPending ? <LoadingSpinner /> : "게스트로 체험하기"}
        </CtaButton>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
