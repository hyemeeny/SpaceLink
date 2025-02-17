"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FolderType } from "@/types/folders";
import { useModalStore } from "@/store/useModalStore";
import LinkAddModal from "@/components/Modal/LinkAddModal";

const LinkInput = ({ folders }: { folders: FolderType[] }) => {
  const { openModals, openModal } = useModalStore();
  const [inputUrl, setInputUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: { url: string }) => {
    setInputUrl(data.url);
    openModal("addLink");
  };

  return (
    <div className="bg-gray01 flex flex-col justify-center pt-6 pb-10 md:pt-[60px] md:pb-[90px]">
      <div className="m-auto">
        <div className="flex items-center justify-end relative w-[325px] h-[53px] md:w-[704px] md:h-[69px] lg:w-[800px]">
          <input
            type="text"
            id="url"
            placeholder="링크를 추가해 보세요"
            {...register("url", { required: "URL을 입력해 주세요" })}
            className="w-full h-full ring-1 ring-inset pl-14 ring-purple01 rounded-[15px] placeholder-gray04 text-gray06 text-sm md:text-base transition duration-500 ease-in-out focus-within:ring-2 bg-[url('/icons/link.svg')] bg-no-repeat bg-[20px]"
          />
          <button
            type="button"
            className="w-[80px] h-[37px] absolute mr-2 md:mr-4 bg-gradient from-purple01 to-sky01 rounded-lg text-white text-sm font-normal"
            onClick={handleSubmit(onSubmit)}
          >
            추가하기
          </button>
        </div>
        {errors.url && <p className="pl-2 mt-1 text-red01 text-sm font-normal">{errors.url.message}</p>}
      </div>
      {openModals.has("addLink") && <LinkAddModal folders={folders} url={inputUrl} />}
    </div>
  );
};

export default LinkInput;
