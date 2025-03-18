interface DropdownProps {
  items: string[];
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (value: string) => void;
}

const Dropdown = ({ items, isOpen, onClose, onItemClick }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 mt-10 p-2 rounded-lg shadow-custom bg-white overflow-hidden">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => {
            onItemClick(item);
            onClose();
          }}
          className="flex items-center gap-2 w-max text-sm text-gray06 cursor-pointer px-4 py-2 rounded-md hover:bg-gray01  transition duration-500 ease-in-out"
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;
