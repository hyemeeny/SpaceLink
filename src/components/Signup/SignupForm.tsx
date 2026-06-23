"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useCheckEmail } from "@/hooks/queries/useCheckEmail";
import { useDebounce } from "@/hooks/useDebounce";
import { signUpAction } from "@/actions/auth";

const SignupForm = () => {
  const [isPending, setIsPending] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });

  const email = watch("email");
  const debouncedEmail = useDebounce(email, 500);
  const { data, isLoading, error } = useCheckEmail(debouncedEmail);

  const onSubmit = async (formData: SignupFormValues) => {
    if (isLoading) return; // 1. 이메일 체크 중이면 제출 차단
    // (중복 이메일인지 확인 안 된 상태에서 제출 방지)

    setIsPending(true); // 2. 로딩 시작 → 스피너 표시

    try {
      await signUpAction(formData); // 3. 서버 액션 호출
    } catch (error: any) {
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        return; // 4. 회원가입 성공 → redirect() throw
        // 로그인 페이지로 전환될 때까지 스피너 유지
      }

      if (error?.field) {
        // 5. 서버에서 특정 필드 에러 반환한 경우
        // ex) { field: "email", message: "이미 사용 중인 이메일입니다." }
        // 해당 필드 아래에 에러 메시지 표시
        setError(error.field as keyof SignupFormValues, {
          type: "server",
          message: error.message,
        });
        setIsPending(false); // 6. 필드 에러 → 로딩 해제
        return;
      }

      // 7. 그 외 일반 에러 (서버 오류 등)
      toast.error(error?.message || toastMessages.error.signup);
      setIsPending(false); // 8. 일반 에러 → 로딩 해제
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
            errors={errors.email?.message || (error?.status === 409 ? "이미 사용 중인 이메일입니다." : undefined)}
            successMessage={!errors.email && !isLoading && data ? "사용 가능한 이메일입니다." : ""}
            {...register("email")}
          />
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

        <CtaButton type="submit" size="large" disabled={!isValid || isPending}>
          {isPending ? <LoadingSpinner /> : "회원가입"}
        </CtaButton>
      </form>
    </FormContainer>
  );
};

export default SignupForm;
