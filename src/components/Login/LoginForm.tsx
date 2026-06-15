"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const GUEST_CREDENTIALS = {
  email: process.env.NEXT_PUBLIC_GUEST_EMAIL!,
  password: process.env.NEXT_PUBLIC_GUEST_PASSWORD!,
};

const LoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isGuestPending, setIsGuestPending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("signup") === "success") {
      toast.success(toastMessages.success.signUp);
      router.replace("/login");
    }
  }, [router, searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleLogin = async (payload: LoginFormValues, setLoading: (v: boolean) => void) => {
    setLoading(true); // 1. 로딩 시작 → 스피너 표시
    try {
      await loginAction(payload); // 2. 서버 액션 호출
    } catch (error: any) {
      // 3. loginAction 내부에서 redirect()가 실행되면
      //    Next.js가 내부적으로 에러를 throw함
      //    → catch로 떨어지는데 이건 진짜 에러가 아니라 정상 동작
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        return; // 4. 그냥 return → setLoading(false) 안 함 → 스피너 유지
        //    페이지가 전환되면서 컴포넌트 자체가 사라지기 때문에 상태 관리 불필요
      }
      // 5. 진짜 에러(로그인 실패, 서버 오류 등)일 때만 여기 도달
      toast.error(error?.message || toastMessages.error.login);
      setLoading(false); // 6. 에러일 때만 로딩 해제 → 스피너 숨김
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
