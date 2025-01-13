import { ReactNode } from "react";

export const Content = ({ children, ...props }: { children: ReactNode }) => {
  return <div {...props}>{children}</div>;
};
