import { useState } from "react";
import SortIcon from "@/public/images/icons/ic_sort.svg";

interface SortOption {
  key: string;
  label: string;
}

interface DropdownMenuProps {
  onSortSelection: (sortOption: string) => void;
  sortOptions: SortOption[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onSortSelection,
  sortOptions,
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border border-gray-200 rounded-lg py-2 px-3 ml-2 flex items-center"
      >
        <SortIcon alt="정렬" />
      </button>

      {isDropdownVisible && (
        <div className="absolute top-full right-0 bg-white rounded-lg border border-gray-200 shadow-md z-50">
          {sortOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => {
                onSortSelection(option.key);
                setIsDropdownVisible(false);
              }}
              className="py-3 px-10 border-b border-gray-200 text-lg text-gray-800 cursor-pointer last:border-b-0 hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;