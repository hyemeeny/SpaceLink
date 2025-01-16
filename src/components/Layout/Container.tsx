import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <section className="w-full md:w-[704px] lg:w-[1060px] mx-auto px-4 box-border">{children}</section>;
};

export default Container;
