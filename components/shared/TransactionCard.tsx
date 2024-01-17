import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import Link from "next/link";
import DeleteTransaction from "./DeleteTransaction";
import UpdateTransaction from "./UpdateTransaction";

type TransactionCardProps = {
  transaction: Transaction;
  categoryName: string;
};

export default function TransactionCard({
  transaction,
  categoryName,
}: TransactionCardProps) {
  const { id, title, amount, date, spendType, categoryId } = transaction || {};

  const isIncome = spendType === "INCOME";

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-2 rounded-md px-2 py-2 transition-all hover:bg-slate-100">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary">
                <p className="text-4xl font-bold uppercase text-primary-foreground">
                  {categoryName?.charAt(0)}
                </p>
              </div>
              <div>
                <p className="line-clamp-1 text-left text-sm font-bold capitalize">
                  {title}
                </p>
                <p className="text-left text-sm text-gray-500">
                  {formatDate(date)}
                </p>
                <Link
                  href={`/dashboard/categories/${categoryId}`}
                  className="block text-left text-sm text-gray-500 hover:text-primary"
                >
                  {categoryName}
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm capitalize text-gray-500">
                {spendType.toLocaleLowerCase()}
              </p>
              <p className="text-sm font-bold">
                {isIncome ? "+" : "-"}${Math.abs(amount).toFixed(2)}
              </p>
              <span
                className={`mt-2 h-1 w-full ${isIncome ? "bg-green-500" : "bg-red-500"}`}
              />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <UpdateTransaction transaction={transaction} />
        <DeleteTransaction id={id} />
      </PopoverContent>
    </Popover>
  );
}
