"use client";

import { postLinks } from "@/actions/links";
import { useForm } from "react-hook-form";
import { FolderType } from "@/types/folders";

const LinkInput = ({ folders }: { folders: FolderType[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      url: "",
      folderId: folders.length > 0 ? folders[0].id : 0,
    },
  });

  const onSubmit = async (data: { url: string; folderId: number }) => {
    try {
      await postLinks(data);
      console.log("링크 등록 성공", data);
    } catch (error) {
      console.error("링크 등록 실패", error);
    }
  };

  return (
    <div className="bg-gray01 flex justify-center pt-6 pb-10 md:pt-[60px] md:pb-[90px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-end relative w-[325px] h-[53px] md:w-[704px] md:h-[69px] lg:w-[800px]"
      >
        <input
          type="text"
          id="url"
          placeholder="링크를 추가해 보세요"
          {...register("url", { required: "URL을 입력해 주세요요" })}
          className="w-full h-full ring-1 ring-inset pl-14 ring-purple01 rounded-[15px] placeholder-gray04 text-gray06 text-sm md:text-base transition duration-500 ease-in-out focus-within:ring-2 bg-[url('/icons/link.svg')] bg-no-repeat bg-[20px]"
        />
        {errors.url && <p className="mt-1 text-red-500 text-sm">{errors.url.message}</p>}
        <input type="text" id="folderId" {...register("folderId")} className="hidden" />
        <button
          type="submit"
          className="w-[80px] h-[37px] absolute mr-2 md:mr-4 bg-gradient from-purple01 to-sky01 rounded-lg text-white text-sm font-normal"
        >
          추가하기
        </button>
      </form>
    </div>
  );
};

export default LinkInput;
