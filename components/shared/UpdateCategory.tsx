"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function UpdateCategory({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}) {
  const [category, setCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    setCategory(categoryName);
  }, [categoryName]);

  function handleCreate() {
    if (!category) {
      return toast.error("Please enter a category name");
    }
    if (!categoryId) {
      toast.error("Invalid category id");
      return;
    }

    const promise = fetch(`/api/categories/${categoryId}`, {
      method: "PATCH",
      body: JSON.stringify({ name: category }),
    });

    toast.promise(promise, {
      loading: "Please wait",
      success: () => {
        router.refresh();
        return "Category updated";
      },
      error: (error) => {
        return "Failed to update!";
      },
    });
  }
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Update
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleCreate} type="submit">
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
