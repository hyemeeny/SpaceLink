import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

const PaginationButton = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};

export default PaginationButton;
