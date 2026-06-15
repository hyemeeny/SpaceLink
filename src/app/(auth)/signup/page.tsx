import { Suspense } from "react";
import SignupForm from "@/components/Signup/SignupForm";

export const metadata = {
  title: "회원가입 | SPACELINK",
};

const SignupPage = () => {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
};

export default SignupPage;
