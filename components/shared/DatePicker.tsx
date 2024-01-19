"use client";

import { format, formatISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TransactionCreateDto } from "@/types";

type DatePickerProps = {
  newTransaction: TransactionCreateDto;
  setNewTransaction: React.Dispatch<React.SetStateAction<TransactionCreateDto>>;
};

export default function DatePicker({
  newTransaction,
  setNewTransaction,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    newTransaction.date ? new Date(newTransaction.date) : new Date(),
  );

  function handelPickDate(date: Date | undefined) {
    setDate(date);
    setNewTransaction({
      ...newTransaction,
      date: formatISO(date || new Date()),
    });
    return date;
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handelPickDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
