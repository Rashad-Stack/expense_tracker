"use client";

import { format } from "date-fns";
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

type DatePickerProps = {
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

export default function DatePicker({
  newTransaction,
  setTransaction,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  function handelPickDate(date: Date | undefined) {
    setDate(date);
    setTransaction({
      ...newTransaction,
      date: date?.toISOString(),
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
