import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string;
}

const CtaButton = ({ children, width = "w-full", height = "h-full", type = "button", disabled = false, className }: ButtonProps) => {
  const baseStyle = "bg-gradient from-purple01 to-sky01 rounded-lg text-white text-sm md:text-lg font-semibold transition duration-300 ease-in-out";

  return (
    <button type={type} className={clsx(baseStyle, width, height, disabled && "opacity-50 cursor-not-allowed", className)} disabled={disabled}>
      {children}
    </button>
  );
};

export default CtaButton;
