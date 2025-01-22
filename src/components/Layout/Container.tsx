import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section className={clsx("w-full md:w-[704px] lg:w-[1060px] mx-auto px-7 md:px-0 box-border", className)}>
      {children}
    </section>
  );
};

export default Container;
