"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Category } from "@prisma/client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSelectCategory(category: string) {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  }

  useEffect(() => {
    const getAllCategories = () => {
      axios
        .get("/api/categories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => console.log(error));
    };

    getAllCategories();
  }, []);

  return (
    <div className="w-full border-b sm:max-w-[190px]">
      <Select onValueChange={(value: string) => onSelectCategory(value)}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All" className="select-item p-regular-14">
            All
          </SelectItem>

          {categories.map((category) => (
            <SelectItem
              value={category.id}
              key={category.id}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
