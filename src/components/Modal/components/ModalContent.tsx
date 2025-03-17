import { FormEventHandler, ReactNode } from "react";

interface ModalContent {
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

export const Content = ({ onSubmit, children }: ModalContent) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-6 w-[280px]">
      {children}
    </form>
  );
};
