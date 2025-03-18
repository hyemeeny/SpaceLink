import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string;
  variant?: "gradient" | "red";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const CtaButton = ({
  children,
  type = "button",
  disabled = false,
  className,
  variant = "gradient",
  size = "medium",
  onClick,
}: ButtonProps) => {
  const sizeStyles = {
    small: "px-4 h-[36px] text-xs md:text-sm",
    medium: "px-6 h-[43px] md:h-[53px] text-sm md:text-base",
    large: "px-8 h-[50px] md:h-[60px] text-base md:text-lg",
  };

  const variantStyles = {
    gradient: "bg-gradient from-purple01 to-sky01",
    red: "bg-red01",
  };

  return (
    <button
      type={type}
      className={clsx(
        "rounded-xl text-white font-semibold transition duration-300 ease-in-out",
        sizeStyles[size],
        disabled ? "bg-gray02 cursor-not-allowed" : variantStyles[variant],
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CtaButton;
