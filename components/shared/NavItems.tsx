"use client";

import { menu } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathName = usePathname();
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = pathName === item.path;
          return (
            <li
              key={item.name}
              className={`${isActive ? "font-semibold text-primary" : "text-slate-500"} text-sm`}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
