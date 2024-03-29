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
import { TransactionCreateDto } from "@/types";
import { SpendType } from "@prisma/client";
import axios from "axios";
import { formatISO } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiMiniPlus } from "react-icons/hi2";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategorySelector from "./CategorySelector";
import DatePicker from "./DatePicker";
import SpendTypeSelector from "./SpendTypeSelector";

const initialState = {
  title: "",
  date: formatISO(new Date()),
  amount: "",
  categoryId: "",
  spendType: SpendType.INCOME,
};

export default function AddNewTransaction() {
  const [newTransaction, setNewTransaction] =
    useState<TransactionCreateDto>(initialState);
  const { title, date, amount, categoryId, spendType } = newTransaction;
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  }

  function handleCreate() {
    if (!date || !amount || !categoryId || !title || !spendType)
      return toast.error("Please fill all fields");

    toast.promise(axios.post("/api/transactions", { ...newTransaction }), {
      loading: "Wait a moment",
      success: (data) => {
        // Rest form
        setNewTransaction(initialState);

        router.push("/dashboard");
        router.refresh();
        return `Successfully saved amount $ ${data.data.amount}`;
      },
      error: (error) => clientError(error.response.data),
    });
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
            value={title}
            name="title"
            className="input-field"
            placeholder="Enter Title"
          />
          <Input
            type="number"
            onChange={handleChange}
            value={amount}
            name="amount"
            className="input-field"
            placeholder="Enter Amount"
            min={0}
          />

          <SpendTypeSelector
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
          />

          <DatePicker
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
          />
          <CategorySelector
            newTransaction={newTransaction}
            setNewTransaction={setNewTransaction}
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
