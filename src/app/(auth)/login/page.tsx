import { Suspense } from "react";
import LoginForm from "@/components/Login/LoginForm";

export const metadata = {
  title: "로그인 | SPACELINK",
};

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
