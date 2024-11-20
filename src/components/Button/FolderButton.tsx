import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button";
  isSelected?: boolean;
  className?: string;
}

const FolderButton = ({ children, type, isSelected, className }: ButtonProps) => {
  const baseStyle = "border-[1px] border-purple01 bg-transparent rounded p-1 md:p-2 text-sm md:text-lg font-normal transition duration-300 ease-in-out";

  return (
    <button type={type} className={clsx(baseStyle, isSelected && "bg-purple01 text-white", className)} aria-selected={isSelected}>
      {children}
    </button>
  );
};

export default FolderButton;
