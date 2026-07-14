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
  return (
    <button
      type={type}
      className={clsx(
        "border-[1px] border-purple01 rounded-md md:rounded-lg px-3 py-2 text-sm md:text-md font-normal transition duration-300 ease-in-out",
        isSelected && "bg-purple01 text-black02 font-semibold",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default FolderButton;
