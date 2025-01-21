import { LinkType } from "@/types/links";
import LinkCard from "@/components/Links/LinkCard";

const LinkList = ({ currentLinks }: { currentLinks: LinkType[] }) => {
  return (
    <div>
      {currentLinks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          {currentLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </ul>
      ) : (
        <p className="mt-4">링크가 없습니다.</p>
      )}
    </div>
  );
};

export default LinkList;
