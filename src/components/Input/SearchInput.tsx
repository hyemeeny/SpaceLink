import Image from "next/image";
import { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchInputProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchInput = ({ search, setSearch }: SearchInputProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ 검색어 입력 시 URL 업데이트
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    // ✅ URL의 search 파라미터를 업데이트 (검색어 적용)
    const newParams = new URLSearchParams(searchParams.toString());
    if (newSearch) {
      newParams.set("search", newSearch);
    } else {
      newParams.delete("search");
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-end relative h-[43px] md:h-[54px] md:mb-4">
      <input
        type="text"
        name="search"
        value={search}
        onChange={handleSearchChange}
        placeholder="링크를 검색해 보세요"
        className="w-full h-full bg-white02 rounded-[10px] text-sm md:text-base font-medium placeholder-#666 text-gray06 pl-10"
      />
      <button type="button" className="absolute left-4">
        <Image src={"/icons/search.svg"} width={16} height={16} alt="검색" />
      </button>
    </div>
  );
};

export default SearchInput;
