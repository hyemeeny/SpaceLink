"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler } from "react";

interface SearchInputProps {
  search: string;
  handleSearchChange: ChangeEventHandler;
}

const SearchInput = ({ search, handleSearchChange }: SearchInputProps) => {
  return (
    <div className="flex items-center justify-end relative h-[43px] md:h-[54px] md:mb-4">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearchChange}
        placeholder="링크를 검색해 보세요"
        className="w-full h-full bg-white02 rounded-xl text-sm md:text-base font-medium placeholder-#666 text-gray06 pl-10"
      />
      <button type="button" className="absolute left-4">
        <Image src={"/icons/search.svg"} width={16} height={16} alt="검색" />
      </button>
    </div>
  );
};

export default SearchInput;
