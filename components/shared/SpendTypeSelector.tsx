import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionCreateDto } from "@/types";

type SpendTypeSelectorProps = {
  newTransaction: TransactionCreateDto;
  setNewTransaction: React.Dispatch<React.SetStateAction<TransactionCreateDto>>;
};

export default function SpendTypeSelector({
  newTransaction,
  setNewTransaction,
}: SpendTypeSelectorProps) {
  const [value, setValue] = React.useState<string>(
    newTransaction.spendType || "INCOME",
  );

  function handleChange(value: string) {
    setNewTransaction({
      ...newTransaction,
      categoryId: value,
      spendType: value as "INCOME" | "EXPENSE",
    });
    setValue(value);
  }

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Spend Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="INCOME">INCOME</SelectItem>
        <SelectItem value="EXPENSE">EXPENSE</SelectItem>
      </SelectContent>
    </Select>
  );
}
