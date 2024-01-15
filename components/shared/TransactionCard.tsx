import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DeleteTransaction from "./DeleteTransaction";
import UpdateTransaction from "./UpdateTransaction";

export default function TransactionCard() {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex flex-col gap-2 rounded-md px-2 py-2 transition-all hover:bg-slate-100">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-primary">
                <p className="text-4xl font-bold text-primary-foreground">B</p>
              </div>
              <div>
                <p className="line-clamp-1 text-left text-sm font-bold">
                  Book Shop Book
                </p>
                <p className="text-left text-sm text-gray-500">01-04-2024</p>
                <p className="text-left text-sm text-gray-500">Book Shop</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">Income</p>
              <p className="text-sm font-bold">+$0.00</p>
              <span className="mt-2 h-1 w-full bg-green-500" />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="space-y-4">
        <UpdateTransaction />
        <DeleteTransaction />
      </PopoverContent>
    </Popover>
  );
}
