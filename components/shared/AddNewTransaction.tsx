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
import { useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategorySelector from "./CategorySelector";
import DatePicker from "./DatePicker";

const initialState = {
  title: "",
  date: "",
  amount: "",
  categoryId: "",
};

export default function AddNewTransaction() {
  const [newTransaction, setTransaction] = useState(initialState);
  const { title, date, amount, categoryId } = newTransaction;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  }

  function handleCreate() {
    // if (!date || !amount || !categoryId || !title)
    //   return toast.error("Please fill all fields");

    console.log(newTransaction);

    toast.success("Transaction added successfully");
  }

  return (
    <Dialog>
      <DialogTrigger className="btn-modal-add">
        <HiMiniPlus className="h-6 w-6" /> <span>Add New Transaction</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Transaction</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <Input
            type="text"
            onChange={handleChange}
            name="title"
            className="input-field"
            placeholder="Enter Title"
          />
          <Input
            type="number"
            onChange={handleChange}
            name="amount"
            className="input-field"
            placeholder="Enter Amount"
          />

          <DatePicker
            newTransaction={newTransaction}
            setTransaction={setTransaction}
          />
          <CategorySelector
            newTransaction={newTransaction}
            setTransaction={setTransaction}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleCreate} type="submit">
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
