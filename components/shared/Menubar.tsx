import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";

export default function Menubar() {
  return (
    <aside className="space-y-8 p-4 max-md:hidden">
      <Link href="/">
        <Image
          src="/assets/svg/logo-no-background.svg"
          alt="logo"
          width="130"
          height="50"
        />
      </Link>
      <NavItems />
    </aside>
  );
}
