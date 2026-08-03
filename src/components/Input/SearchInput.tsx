import { FormEvent, useEffect, useState } from "react";
import { useLinksViewStore } from "@/store/useLinksViewStore";
import BaseInput from "@/components/Input/BaseInput";
import { RiSearchLine } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

const SearchInput = () => {
  const search = useLinksViewStore((s) => s.search);
  const setSearch = useLinksViewStore((s) => s.setSearch);
  const [draft, setDraft] = useState(search ?? "");

  useEffect(() => {
    setDraft(search ?? "");
  }, [search]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = draft.trim();
    setSearch(trimmed || undefined);
  };

  const handleReset = () => {
    setDraft("");
    setSearch(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <BaseInput
        name="search"
        value={draft}
        onChange={(e) => setDraft((e.target as HTMLInputElement).value)}
        placeholder="링크를 검색해 보세요"
        bordered={false}
        inputClassName="h-[43px] md:h-[54px] bg-white02 font-medium pl-11"
        ariaLabel="검색어 입력"
        leftElement={
          <button type="submit" className="absolute p-4 left-0 top-1/2 -translate-y-1/2" aria-label="검색">
            <RiSearchLine className="w-5 h-5 text-gray04" aria-hidden="true" />
          </button>
        }
        rightElement={
          draft ? (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={handleReset}
              aria-label="검색어 지우기"
            >
              <TiDelete className="w-7 h-7 text-gray03" aria-hidden="true" />
            </button>
          ) : null
        }
      />
      {search && (
        <h4 className="text-2xl md:text-3xl text-gray03">
          <span className="text-white font-semibold">{search}</span>로 검색한 결과입니다.
        </h4>
      )}
    </form>
  );
};

export default SearchInput;
