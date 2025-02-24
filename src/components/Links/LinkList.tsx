import { LinkType } from "@/types/links";
import LinkCard from "@/components/Links/LinkCard";
import Lottie from "lottie-react";
import noneLottie from "@/assets/lotties/none.json";

const LinkList = ({ currentLinks }: { currentLinks: LinkType[] }) => {
  return (
    <div>
      {currentLinks && currentLinks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          {currentLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          <Lottie animationData={noneLottie} className="w-[300px]" />
          <p className="text-base text-gray01">아직 저장된 링크가 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default LinkList;
