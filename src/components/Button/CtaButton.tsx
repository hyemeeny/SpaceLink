import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  width?: string;
  height?: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string;
  variant?: "gradient" | "red";
  onClick?: () => void;
}

const CtaButton = ({
  children,
  width = "w-full",
  height = "h-full",
  type = "button",
  disabled = false,
  className,
  variant = "gradient",
  onClick,
}: ButtonProps) => {
  const baseStyle = "rounded-xl text-white text-sm md:text-lg font-semibold transition duration-300 ease-in-out";

  const variantStyles = {
    gradient: "bg-gradient from-purple01 to-sky01",
    red: "bg-red01",
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyle,
        width,
        height,
        disabled ? "bg-gray-400 cursor-not-allowed" : variantStyles[variant],
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
