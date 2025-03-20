import clsx from "clsx";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { logout } from "@/actions/auth";
import { FiLink, FiStar, FiLogOut } from "react-icons/fi";

interface MenuLinksProps {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const MenuLinks = ({ setIsOpen }: MenuLinksProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    setIsOpen?.(false);
  };

  const navLinkBase =
    "flex items-center gap-3 w-full text-sm md:text-base cursor-pointer px-4 py-3 rounded-md hover:bg-purple01 transition duration-300 ease-in-out";
  const activeStyle = "bg-purple01";

  return (
    <div className="flex flex-col gap-2">
      <Link href="/links" className={clsx(navLinkBase, pathname === "/links" ? activeStyle : "")}>
        <FiLink className="size-5 md:size-6" /> 링크 보관소
      </Link>
      <Link href="/favorite" className={clsx(navLinkBase, pathname === "/favorite" ? activeStyle : "")}>
        <FiStar className="size-5 md:size-6" /> 즐겨찾기
      </Link>
      <hr className="border-purple02 mx-2" />
      <button onClick={handleLogout} className={navLinkBase}>
        <FiLogOut className="size-5 md:size-6" /> 로그아웃
      </button>
    </div>
  );
};

export default MenuLinks;
