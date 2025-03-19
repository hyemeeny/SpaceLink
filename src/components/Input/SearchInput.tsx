"use client";

import { useEffect, useState } from "react";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { RiSearchLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const SearchInput = () => {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const [search, setSearch] = useState(searchParams.search || "");

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams({ search });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearch("");
    setSearchParams({ search: "" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchParams({ search });
    }
  };

  useEffect(() => {
    setSearch(searchParams.search);
  }, [searchParams.search]);

  return (
    <div className="flex flex-col gap-4 md:gap-6 mt-4 mb-8">
      <div className="flex items-center justify-end relative h-[43px] md:h-[54px]">
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="링크를 검색해 보세요"
          className="w-full h-full bg-white02 rounded-xl text-sm md:text-base font-medium placeholder-gray04 text-gray06 pl-11"
        />
        <button type="button" className="absolute left-4" onClick={handleSearch}>
          <RiSearchLine className="w-5 h-5 text-gray04" />
        </button>
        {search && (
          <button type="button" className="absolute right-4" onClick={handleReset}>
            <TiDelete className="w-7 h-7 text-gray03" />
          </button>
        )}
      </div>
      {search && (
        <h4 className="text-2xl md:text-3xl text-gray03">
          <span className="text-white font-semibold">{search}</span>로 검색한 결과입니다.
        </h4>
      )}
    </div>
  );
};

export default SearchInput;
