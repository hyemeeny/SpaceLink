import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface FormContainer {
  children: ReactNode;
  title: string;
  text: string;
  link: string;
  linkTitle: string;
  easyTitle: string;
}

const FormContainer = ({ children, title, text, link, linkTitle, easyTitle }: FormContainer) => {
  return (
    <section className="flex flex-col gap-6 px-8 md:px-5 min-w-[325px] md:w-[500px] mx-auto py-12 md:py-[10vh]">
      <h1 className="text-white text-center text-2xl md:text-4xl font-semibold mb-12">{title}</h1>
      {children}
      <p className="text-white text-sm md:text-base text-center">
        {text}
        <Link href={link} className="text-purple01 font-semibold border-b-[1px] border-purple01 ml-3">
          {linkTitle}
        </Link>
      </p>

      <div className="flex flex-col">
        <div className="mt-8 flex w-full items-center">
          <hr className="flex-1 border-t border-border-primary" />
          <span className="mx-8 text-base md:text-xl text-white">OR</span>
          <hr className="flex-1 border-t border-border-primary" />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-white text-sm md:text-base">{easyTitle}</p>
          <div className="flex gap-4">
            <Link href="#" className="size-[30px] md:size-[42px]">
              <Image src="/icons/google.svg" width={42} height={42} alt="Google" />
            </Link>
            <Link href="#" className="size-[30px] md:size-[42px]">
              <Image src="/icons/kakao.svg" width={42} height={42} alt="Kakao" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormContainer;
