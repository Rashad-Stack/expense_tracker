import Link from "next/link";

export default function TransactionCard() {
  return (
    <Link href="/">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <p className="text-2xl font-bold text-primary-foreground">B</p>
            </div>
            <div>
              <p className="line-clamp-1 text-sm font-bold">Book Shop Book</p>
              <p className="text-sm text-gray-500">Book Shop</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm text-gray-500">Income</p>
            <p className="text-sm font-bold">$0.00</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
