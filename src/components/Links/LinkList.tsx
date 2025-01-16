import { Link } from "@/types/links";

const LinkList = ({ currentLinks }: { currentLinks: Link[] }) => {
  return (
    <div>
      {currentLinks.length > 0 ? (
        <ul>
          {currentLinks.map((link) => (
            <li key={link.id}>{link.title}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">링크가 없습니다.</p>
      )}
    </div>
  );
};

export default LinkList;
