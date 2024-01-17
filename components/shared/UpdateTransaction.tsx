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
import { TransactionUpdateDto } from "@/types";
import { Transaction } from "@prisma/client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CategorySelector from "./CategorySelector";
import DatePicker from "./DatePicker";
import SpendTypeSelector from "./SpendTypeSelector";

export default function UpdateTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [newTransaction, setNewTransaction] = useState<TransactionUpdateDto>({
    ...transaction,
    date: transaction.date.toISOString(),
    amount: transaction.amount.toString(),
  });
  const router = useRouter();

  const { title, amount } = newTransaction;

  function handleTransactionUpdate() {
    if (!title || !amount) {
      toast.error("Please fill all fields");

      return;
    }

    const promise = fetch(`/api/transactions/${transaction.id}`, {
      method: "PATCH",
      body: JSON.stringify(newTransaction),
    });

    toast.promise(promise, {
      loading: "Please wait",
      success: () => {
        router.refresh();
        return "Transaction updated";
      },
      error: (error) => {
        return "Failed to update!";
      },
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setNewTransaction({
      ...transaction,
      date: transaction.date.toISOString(),
      amount: transaction.amount.toString(),
    });
  }, [setNewTransaction, transaction]);

  return (
    <Dialog>
      <DialogTrigger className="btn-modal-add">Update</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
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
            value={Math.abs(Number(amount))}
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
            <Button
              onClick={() => startTransition(handleTransactionUpdate)}
              type="submit"
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
