import { useMutation } from "@tanstack/react-query";
import { loginUser, SignupUser } from "../api/auth";
import { useAuthStore } from "../store/authStore";

// 로그인 훅
export function useLogin() {
  const setUser = useAuthStore((state: any) => state.setUser);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser(email, password),
    onSuccess: (data) => {
      setUser({ id: data.user.id, name: data.user.name }, data.token);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
}

// 회원가입 훅
export function useSignup() {
  const setUser = useAuthStore((state: any) => state.setUser);

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => SignupUser(name, email, password),
    onSuccess: (data) => {
      setUser({ id: data.user.id, name: data.user.name }, data.token);
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
}
