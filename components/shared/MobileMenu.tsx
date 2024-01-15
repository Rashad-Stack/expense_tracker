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
import { Button } from "../ui/button";

export default function MobileMenu() {
  const pathName = usePathname();
  return (
    <nav>
      <Sheet>
        <SheetTrigger>
          <HiBars3CenterLeft className="h-12 w-12" />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetFooter className="flex flex-col gap-4">
            <SheetClose asChild>
              <Link href="/sign-in" className="text-sm">
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
          <SheetClose asChild>
            <Button size="lg" className="mt-4 w-full">
              <Link href="/">Logout</Link>
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
