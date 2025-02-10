import { ReactNode } from "react";

type DropdownItemProps = {
  children: ReactNode;
  onClick: () => void;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => (
  <div
    onClick={onClick}
    className="w-max px-6 py-2 text-sm cursor-pointer hover:bg-gray01 hover:text-purple01 transition duration-500 ease-in-out"
  >
    {children}
  </div>
);

export default DropdownItem;
