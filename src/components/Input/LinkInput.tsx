"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FolderType } from "@/types/folders";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkSchema, LinkFormValues } from "@/schema/zodSchema";
import { useModalStore } from "@/store/useModalStore";
import LinkAddModal from "@/components/Modal/LinkAddModal";
import LoadingSpinner from "../LoadingSpinner";

const LinkInput = ({ folders }: { folders: FolderType[] }) => {
  const { openModals, openModal } = useModalStore();
  const [inputUrl, setInputUrl] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkFormValues>({
    mode: "onChange",
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: LinkFormValues) => {
    setInputUrl(data.url);
    openModal("addLink");
  };

  return (
    <div className="flex flex-col justify-center pt-6 pb-10 md:pt-[60px] md:pb-[90px]">
      <div className="m-auto">
        <div className="flex items-center justify-end relative w-[325px] h-[53px] md:w-[704px] md:h-[69px] lg:w-[800px]">
          <input
            type="text"
            id="url"
            placeholder="링크를 추가해 보세요"
            {...register("url")}
            className="w-full h-full ring-2 ring-inset pl-14 ring-purple01 focus-within:ring-purple01 rounded-xl placeholder-gray04 text-gray06 text-sm md:text-base transition duration-500 ease-in-out focus-within:ring-4 bg-[url('/icons/link.svg')] bg-no-repeat bg-[20px]"
          />
          <button
            type="button"
            className="w-[80px] h-[37px] absolute mr-2 md:mr-4 bg-gradient from-purple01 to-sky01 rounded-xl text-white text-sm font-normal"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? <LoadingSpinner /> : "추가하기"}
          </button>
        </div>
        {errors.url && <p className="pl-2 mt-1 text-red01 text-sm font-normal">{errors.url.message}</p>}
      </div>
      {openModals.has("addLink") && <LinkAddModal folders={folders} url={inputUrl} reset={reset} />}
    </div>
  );
};

export default LinkInput;
