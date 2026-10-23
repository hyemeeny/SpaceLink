import clsx from "clsx";
import { Link } from "@/types/link";
import LinkCard from "@/components/Links/LinkCard";
import SkeletonCard from "@/ui/SkeletonCard";

interface LinkListProps {
  links: Link[];
  isLoading: boolean;
  isFetching?: boolean;
}

const LinkList = ({ links, isLoading, isFetching }: LinkListProps) => {
  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ul>
    );
  }

  if (links.length === 0) {
    return <p className="mt-[20vh] text-center text-base text-gray01">아직 저장된 링크가 없습니다.</p>;
  }

  return (
    <ul
      aria-busy={isFetching}
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity",
        isFetching && "opacity-80",
      )}
    >
      {links.map((link, index) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </ul>
  );
};

export default LinkList;
