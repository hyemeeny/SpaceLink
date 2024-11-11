import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full lg:max-w-[1060px] mx-auto">{children}</section>
  );
};

export default Container;
