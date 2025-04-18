"use client";

import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginFormValues } from "@/schema/zodSchema";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import FormContainer from "@/components/Layout/FormContainer";
import Button from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import LoadingSpinner from "@/components/common/LoadingSpinner";

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
      const response = await login(data);

      if (response && response.message) {
        toast.error(response.message);
      } else {
        toast.success(toastMessages.success.login);
        router.push("/");
      }
    } catch (error) {
      console.error("로그인에 실패하였습니다.", error);
      toast.error(toastMessages.error.login);
    }
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

        <Button type="submit" size="large" disabled={!isValid}>
          {isValid ? <LoadingSpinner /> : "로그인"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
