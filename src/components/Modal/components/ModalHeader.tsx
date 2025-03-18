import { ReactNode } from "react";

export const Header = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <h3 className="text-gray06 text-xl font-bold" {...props}>
      {children}
    </h3>
  );
};
