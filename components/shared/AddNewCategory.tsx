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
import { clientError } from "@/lib/utils";
import axios from "axios";
import { startTransition, useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddNewCategory() {
  const [newCategory, setNewCategory] = useState<string>("");

  function handleAddCategory() {
    if (!newCategory) {
      toast.error("Please enter a category name");
      return;
    }

    toast.promise(axios.post("/api/categories", { name: newCategory }), {
      loading: "Wait a moment",
      success: (data) => `Successfully saved ${data.data.name}`,
      error: (error) => clientError(error.response.data),
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="btn-modal-add">
        <HiMiniPlus className="h-6 w-6" /> <span>Add New Category</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Expense Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input
            className="input-field"
            placeholder="Category Name"
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => startTransition(handleAddCategory)}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
