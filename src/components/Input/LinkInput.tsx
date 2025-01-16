import CtaButton from "../Button/CtaButton";

const LinkInput = () => {
  return (
    <div className="flex">
      <input className="w-full h-[60px] ring-1 ring-inset px-4 ring-gray03 rounded-lg placeholder-gray04 text-gray06 text-base transition duration-500 ease-in-out focus-within:ring-purple01 focus-within:ring-2" />
      <CtaButton width="w-[80px]" height="h-[37px]">
        추가하기
      </CtaButton>
    </div>
  );
};

export default LinkInput;
