import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return <section className={clsx("w-full max-w-7xl mx-auto px-4 md:px-6 xl:px-0", className)}>{children}</section>;
};

export default Container;
