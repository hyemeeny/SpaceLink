import { ReactNode } from "react";
import CtaButton from "../../Button/CtaButton";

export const Button = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <CtaButton type="submit" width="w-[280px]" height="h-[52px]" {...props}>
      {children}
    </CtaButton>
  );
};
