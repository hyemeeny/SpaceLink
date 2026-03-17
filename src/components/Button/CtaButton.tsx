import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  className?: string;
  url?: string;
  variant?: "gradient" | "red";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

const CtaButton = ({
  children,
  type = "button",
  disabled = false,
  className,
  url,
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
    gradient: "text-white bg-gradient from-purple01 to-sky01",
    red: "text-white bg-red01",
  };

  const baseStyles = clsx(
    "flex items-center justify-center rounded-xl font-semibold transition duration-300 ease-in-out",
    sizeStyles[size],
    disabled ? "bg-gray02 text-gray04 cursor-not-allowed" : variantStyles[variant],
    className,
  );

  return (
    <>
      {url ? (
        <Link href={url} className={baseStyles}>
          {children}
        </Link>
      ) : (
        <button type={type} className={baseStyles} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default CtaButton;
