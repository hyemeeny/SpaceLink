import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <section className="w-full mx-auto px-4 box-border">{children}</section>;
};

export default Container;
