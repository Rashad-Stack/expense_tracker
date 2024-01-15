"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";

type CategorySelectorProps = {
  newTransaction: any;
  setTransaction: React.Dispatch<
    React.SetStateAction<{
      title: string;
      date: string;
      amount: string;
      categoryId: string;
    }>
  >;
};

type ICategory = {
  id: string;
  name: string;
};

export default function CategorySelector({
  newTransaction,
  setTransaction,
}: CategorySelectorProps) {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [value, setValue] = React.useState("");

  function handleChange(value: string) {
    setTransaction({
      ...newTransaction,
      categoryId: value,
    });
    setValue(value);
  }

  React.useEffect(() => {
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
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
