import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="col-span-3 w-full lg:hidden">
      <div className="flex h-full items-center justify-between py-3">
        <Link href="/">
          <Image
            src="/assets/svg/logo-no-background.svg"
            alt="logo"
            width="120"
            height="50"
          />
        </Link>
        <div className="flex w-32 items-center justify-end gap-3">
          <Button asChild size="lg">
            <Link href="/sign-in">Login</Link>
          </Button>

          {true && <MobileMenu />}
        </div>
      </div>
    </header>
  );
}
