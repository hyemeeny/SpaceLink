import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <section
      className={clsx(
        "w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto px-7 pb-32 md:px-4 box-border",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Container;
