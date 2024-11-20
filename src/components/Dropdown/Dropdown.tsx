import { useState } from "react";
import DropdownItem from "./DropdownItem";

type DropdownProps = {
  items: string[];
  onItemClick: (item: string) => void;
};

const Dropdown = ({ items, onItemClick }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div>
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                onItemClick(item);
                setIsOpen(false);
              }}
            >
              {item}
            </DropdownItem>
          ))}
        </div>
      )}
    </>
  );
};

export default Dropdown;
