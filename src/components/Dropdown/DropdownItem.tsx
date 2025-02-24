import { ReactNode } from "react";

type DropdownItemProps = {
  children: ReactNode;
  onClick: () => void;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => (
  <div
    onClick={onClick}
    className="w-max px-6 py-2 text-sm text-gray06 cursor-pointer hover:bg-purple01 hover:text-white transition duration-500 ease-in-out"
  >
    {children}
  </div>
);

export default DropdownItem;
