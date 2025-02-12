import { z } from "zod";

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type FormValues = z.infer<typeof FolderAddSchema>;

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{8,15}$/;

// 로그인 스키마
export const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

// 회원가입 스키마 정의
export const SignupSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "유효한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 8자리 이상 입력해 주세요." })
    .max(15, { message: "비밀번호를 15자리 이하로 입력해 주세요." })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자(~!@#$%^&*)를 모두 조합해 주세요.",
    }),
});

// 폴더 생성 스키마
export const FolderAddSchema = z.object({
  name: z.string().min(1, { message: "폴더 이름을 입력해주세요." }).max(8, { message: "8자리 이내 입력해 주세요." }),
});

// 폴더 수정 스키마
export const FolderUpdateSchema = z.object({
  value: z.string().min(1, { message: "폴더 이름을 입력해주세요." }).max(8, { message: "8자리 이내 입력해 주세요." }),
});

// 링크 수정 스키마
export const LinkUpdateSchema = z.object({
  value: z.string().url({ message: "유효한 URL을 입력해주세요." }).min(1, { message: "링크 URL을 입력해주세요." }),
});
