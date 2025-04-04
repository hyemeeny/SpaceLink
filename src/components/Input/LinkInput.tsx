"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkAddSchema, LinkAddFormValues } from "@/schema/zodSchema";
import { FolderType } from "@/types/folders";
import { useModalStore } from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import LinkAddModal from "@/components/Modal/components/LinkAddModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LinkInput = ({ folders }: { folders: FolderType[] }) => {
  const { openModals, openModal } = useModalStore();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkAddFormValues>({
    mode: "onChange",
    resolver: zodResolver(LinkAddSchema),
    defaultValues: {
      url: "",
    },
  });

  const onValid = () => {
    try {
      openModal("addLink");
    } catch (error) {
      toast.error(toastMessages.error.addLink);
    }
  };

  return (
    <div className="w-full md:w-auto m-auto pb-4 pt-14 md:pb-20">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col">
        <div className="flex items-center justify-end relative w-full h-[53px] md:w-[704px] md:h-[69px] lg:w-[800px]">
          <input
            type="text"
            id="url"
            placeholder="링크를 추가해 보세요"
            {...register("url")}
            className="w-full h-full ring-2 ring-inset pl-12 pr-24 md:pr-28 ring-purple01 focus-within:ring-purple01 rounded-xl placeholder-gray04 text-gray06 text-sm md:text-base transition duration-300 ease-in-out md:focus-within:ring-4 bg-[url('/icons/link.svg')] bg-no-repeat bg-[20px] text-overflow"
          />
          <button
            type="submit"
            className="w-[80px] h-[37px] absolute mr-2 md:mr-4 bg-gradient from-purple01 to-sky01 rounded-xl text-white text-sm font-normal"
          >
            {isSubmitting ? <LoadingSpinner /> : "추가하기"}
          </button>
        </div>
        {errors.url && <p className="pl-2 mt-1 text-red01 text-sm font-normal">{errors.url.message}</p>}
      </form>
      {openModals.has("addLink") && <LinkAddModal folders={folders} url={watch("url")} reset={reset} />}
    </div>
  );
};

export default LinkInput;
