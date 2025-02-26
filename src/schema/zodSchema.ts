import { z } from "zod";

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type FolderAddFormValues = z.infer<typeof FolderAddSchema>;
export type FolderUpdateFormValues = z.infer<typeof FolderUpdateSchema>;
export type LinkAddFormValues = z.infer<typeof LinkAddSchema>;
export type LinkFolderAddFormValues = z.infer<typeof LinkFolderAddSchema>;
export type LinkUpdateFormValues = z.infer<typeof LinkUpdateSchema>;

// 비밀번호 조건 정규표현식
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!#$%^&*(),.?":{}|<>])[A-Za-z\d!#$%^&*(),.?":{}|<>]{8,20}$/;
const passwordSchema = z
  .string()
  .min(8, { message: "비밀번호를 8자 이상 입력해 주세요." })
  .max(15, { message: "비밀번호를 20자 이하로 입력해 주세요." })
  .regex(passwordRegex, {
    message: "영문, 숫자, 특수문자를 모두 포함해 주세요.",
  });
const emailSchema = z
  .string()
  .min(1, { message: "이메일을 입력해주세요." })
  .email({ message: "유효한 이메일을 입력해주세요." });
const FolderSchema = z
  .string()
  .min(1, { message: "폴더 이름을 입력해주세요." })
  .max(8, { message: "8자리 이내 입력해 주세요." });
const LinkSchema = z
  .string()
  .url({ message: "유효한 URL을 입력해주세요." })
  .min(1, { message: "링크 URL을 입력해주세요." });

// 로그인 스키마
export const LoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 회원가입 스키마 정의
export const SignupSchema = z
  .object({
    name: z.string().min(1, { message: "닉네임을 입력해주세요." }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

// 폴더 생성 스키마
export const FolderAddSchema = z.object({
  name: FolderSchema,
});

// 폴더 수정 스키마
export const FolderUpdateSchema = z.object({
  value: FolderSchema,
});

// 링크 생성 스키마
export const LinkAddSchema = z.object({
  url: z.string().min(1, "추가할 링크의 URL을 입력해 주세요").url("유효한 URL을 입력해 주세요"),
});

export const LinkFolderAddSchema = z.object({
  url: LinkSchema,
  folderId: z.number().min(1, { message: "폴더를 선택해주세요." }),
});

// 링크 수정 스키마
export const LinkUpdateSchema = z.object({
  value: LinkSchema,
});
