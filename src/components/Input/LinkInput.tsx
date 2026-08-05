"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkAddSchema, LinkAddFormValues } from "@/schema/zodSchema";
import { useModalStore } from "@/store/useModalStore";
import toast from "react-hot-toast";
import toastMessages from "@/lib/toastMessage";
import BaseInput from "@/components/Input/BaseInput";
import LinkAddModal from "@/components/Modal/components/LinkAddModal";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

const LinkInput = () => {
  const { activeModal, openModal } = useModalStore();

  const {
    register,
    reset,
    getValues,
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
      toast.error(error instanceof Error ? error.message : toastMessages.error.addLink);
    }
  };

  return (
    <div className="w-full md:w-auto m-auto py-4 md:pt-14 md:pb-20">
      <form onSubmit={handleSubmit(onValid)}>
        <BaseInput
          id="url"
          placeholder="링크를 추가해 보세요"
          {...register("url")}
          errors={errors.url?.message}
          className="w-full md:w-[704px] lg:w-[800px]"
          inputClassName="h-[53px] md:h-[69px] pl-12 pr-24 md:pr-28 ring-purple01 focus-within:ring-purple01 md:focus-within:ring-2 bg-[url('/icons/link.svg')] bg-no-repeat bg-[20px] text-overflow"
          ariaLabel="링크 추가"
          rightElement={
            <button
              type="submit"
              className="w-[80px] h-[37px] absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-gradient from-purple01 to-sky01 rounded-md md:rounded-lg text-white text-sm font-normal"
            >
              {isSubmitting ? <LoadingSpinner /> : "추가하기"}
            </button>
          }
        />
      </form>
      {activeModal === "addLink" && <LinkAddModal url={getValues("url")} onAdded={reset} />}
    </div>
  );
};

export default LinkInput;
