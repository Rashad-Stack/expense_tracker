"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Input } from "../ui/input";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const delayDebounceFn = setTimeout(() => {
      const query = e.target.value;
      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }

  return (
    <div className="flex h-3 min-w-40 flex-1 items-center overflow-hidden border-b px-4 py-5">
      <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
      <Input
        className="border-0 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search"
        onChange={onSearch}
      />
    </div>
  );
}
