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
import { startTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function DeleteCategory({ id }: { id: string }) {
  const router = useRouter();

  function handleDelete() {
    if (!id) {
      toast.error("Invalid transaction id");
      return;
    }

    const promise = fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    toast.promise(promise, {
      loading: "Please wait",
      success: () => {
        router.refresh();
        return "Category Deleted";
      },
      error: () => "Failed to delete!",
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this category?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => startTransition(handleDelete)} type="submit">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
