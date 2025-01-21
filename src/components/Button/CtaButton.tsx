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
  variant?: "gradient" | "red";
}

const CtaButton = ({ children, width = "w-full", height = "h-full", type = "button", disabled = false, className, variant = "gradient" }: ButtonProps) => {
  const baseStyle = "rounded-lg text-white text-sm md:text-lg font-semibold transition duration-300 ease-in-out";

  const variantStyles = {
    gradient: "bg-gradient from-purple01 to-sky01",
    red: "bg-red01",
  };

  return (
    <button
      type={type}
      className={clsx(baseStyle, variantStyles[variant], width, height, disabled && "opacity-50 cursor-not-allowed", className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CtaButton;
