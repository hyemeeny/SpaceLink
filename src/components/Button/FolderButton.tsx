import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  type?: "button";
  isSelected?: boolean;
  className?: string;
}

const FolderButton = ({ children, type, isSelected = false, className, onClick }: ButtonProps) => {
  const baseStyle = "border-[1px] border-purple01 rounded-[5px] px-2 py-1 md:px-3 md:py-2 text-sm md:text-md font-normal transition duration-300 ease-in-out";

  return (
    <button type={type} className={clsx(baseStyle, isSelected && "bg-purple01 text-white", className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default FolderButton;
