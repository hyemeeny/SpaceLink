import { LinkType } from "@/types/links";
import LinkCard from "@/components/Links/LinkCard";
import LinkNone from "@/components/Links/LinkNone";

const LinkList = ({ currentLinks }: { currentLinks: LinkType[] }) => {
  return (
    <>
      {currentLinks && currentLinks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
          {currentLinks.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </ul>
      ) : (
        <LinkNone>아직 저장된 링크가 없습니다.</LinkNone>
      )}
    </>
  );
};

export default LinkList;
