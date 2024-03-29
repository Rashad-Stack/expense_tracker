"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { menu } from "@/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiBars3CenterLeft } from "react-icons/hi2";

export default function MobileMenu() {
  const pathName = usePathname();
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <HiBars3CenterLeft className="h-10 w-10" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetFooter className="flex flex-col gap-4">
            <SheetClose asChild>
              <Link href="/dashboard" className="text-sm">
                <Image
                  src="/assets/svg/logo-no-background.svg"
                  alt="logo"
                  width="120"
                  height="50"
                />
              </Link>
            </SheetClose>
            {menu.map((item) => {
              const isActive = pathName === item.path;
              return (
                <SheetClose asChild key={item.name}>
                  <Link
                    href={item.path}
                    className={`${isActive ? "font-semibold text-primary" : "text-slate-500"} text-sm`}
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              );
            })}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
