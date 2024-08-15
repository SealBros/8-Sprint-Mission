import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchIcon from "@/public/images/icons/ic_search.svg";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "검색할 키워드를 입력해 주세요",
}) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const currentKeyword = (router.query.q as string) || "";
    setKeyword(currentKeyword);
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-2 flex-1">
      <img src={SearchIcon} alt="검색" className="w-5 h-5" />
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none ml-2 placeholder-gray-400 text-base focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;