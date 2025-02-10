import Image from "next/image";

const SearchInput = () => {
  return (
    <div className="flex items-center justify-end relative h-[43px] md:h-[54px] md:mb-4">
      <input
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
