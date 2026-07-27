"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupFormValues } from "@/schema/zodSchema";
import { signUpAction } from "@/actions/auth";
import { useCheckEmail } from "@/hooks/queries/useCheckEmail";
import { useDebounce } from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import CtaButton from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";

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
    if (isLoading) return;

    setIsPending(true);

    const result = await signUpAction(formData);

    if (result?.success === false) {
      if (result.field) {
        setError(result.field as keyof SignupFormValues, {
          type: "server",
          message: result.message,
        });
      } else {
        toast.error(result.message || toastMessages.error.signup);
      }

      setIsPending(false);
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
