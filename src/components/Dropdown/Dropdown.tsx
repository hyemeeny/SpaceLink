import DropdownItem from "@/components/Dropdown/DropdownItem";

type DropdownProps = {
  items: string[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (item: string) => void;
};

const Dropdown = ({ items, isOpen, onClose, onItemClick }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 mt-10 rounded-xl shadow-custom bg-white overflow-hidden">
      {items.map((item, index) => (
        <DropdownItem
          key={index}
          onClick={() => {
            onItemClick(item);
            onClose();
          }}
        >
          {item}
        </DropdownItem>
      ))}
    </div>
  );
};

export default Dropdown;
