import { Suspense } from "react";
import LinksContent from "@/components/Links/LinksContent";

const LinksPage = () => {
  return (
    <Suspense fallback={null}>
      <LinksContent />
    </Suspense>
  );
};

export default LinksPage;
