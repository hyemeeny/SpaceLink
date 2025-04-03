"use client";

import { useEffect, useState } from "react";
import { LinkType } from "@/types/links";
import LinkCard from "@/components/Links/LinkCard";
import LinkNone from "@/components/Links/LinkNone";
import SkeletonCard from "@/ui/SkeletonCard";

const LinkList = ({ links }: { links: LinkType[] | null }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (links !== null) {
      setIsLoading(false);
    }
  }, [links]);

  return (
    <>
      {isLoading ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 9 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </ul>
      ) : links && links.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((link) => (
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
