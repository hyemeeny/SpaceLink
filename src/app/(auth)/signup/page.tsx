"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "@/actions/auth";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button/CtaButton";
import BaseInput from "@/components/Input/BaseInput";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import { SignupSchema, SignupFormValues } from "@/app/schema/zodSchema";

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
    try {
      await signUp(data);
      router.push("/login");
      toast.success(toastMessages.success.signUp);
    } catch (error) {
      toast.error(toastMessages.error.signUp);
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
          <Link href={"/login"} className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3">
            로그인 하기
          </Link>
        </p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="이메일"
          id="email"
          type="email"
          placeholder="test@test.com"
          errors={errors.email?.message}
          {...register("email")}
        />
        <BaseInput
          label="이름"
          id="name"
          type="text"
          placeholder="이름을 입력해주세요."
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
        {/* <BaseInput
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

export default SignupPage;
