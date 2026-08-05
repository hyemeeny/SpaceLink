import clsx from "clsx";

const SkeletonBar = ({ className }: { className?: string }) => (
  <div className={clsx("rounded bg-gray03/40 shimmer", className)} />
);

export default SkeletonBar;
