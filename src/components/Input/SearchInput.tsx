"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const SearchInput = ({ search: initialSearch }: { search: string }) => {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearch = formData.get("search") as string;

    if (!newSearch.trim()) return;

    setSearch(newSearch);
    const updatedSearchParams = new URLSearchParams();
    if (newSearch) updatedSearchParams.set("search", newSearch);

    router.replace(`?${updatedSearchParams.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    router.replace("?");
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col gap-4 md:gap-6 mb-4 md:mt-4 md:mb-8">
      <div className="flex items-center justify-end relative h-[43px] md:h-[54px]">
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="링크를 검색해 보세요"
          className="w-full h-full bg-white02 rounded-xl text-sm md:text-base font-medium placeholder-gray04 text-gray06 pl-11"
          aria-label="검색어 입력"
          aria-live="polite"
        />
        <button
          type="submit"
          className="absolute left-0 min-w-[50px] min-h-[50px] flex items-center justify-center"
          aria-label="검색"
        >
          <RiSearchLine className="w-5 h-5 text-gray04" aria-hidden="true" />
        </button>
        {search && (
          <button type="button" className="absolute right-4" onClick={handleReset} aria-label="검색어 지우기">
            <TiDelete className="w-7 h-7 text-gray03" aria-hidden="true" />
          </button>
        )}
      </div>
      {search && (
        <h4 className="text-2xl md:text-3xl text-gray03" aria-live="polite">
          <span className="text-white font-semibold">{search}</span>로 검색한 결과입니다.
        </h4>
      )}
    </form>
  );
};

export default SearchInput;
