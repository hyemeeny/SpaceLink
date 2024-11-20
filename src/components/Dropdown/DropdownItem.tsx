import { ReactNode } from "react";

type DropdownItemProps = {
  children: ReactNode;
  onClick: () => void;
};

const DropdownItem = ({ children, onClick }: DropdownItemProps) => (
  <div onClick={onClick} className="px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-100">
    {children}
  </div>
);

export default DropdownItem;
