import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchInput = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-end relative h-[43px] md:h-[54px] md:mb-4">
      <input
        type="text"
        name="search"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
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
