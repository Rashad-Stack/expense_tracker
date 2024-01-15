import AddNewTransaction from "@/components/shared/AddNewTransaction";
import Paginate from "@/components/shared/Paginate";
import TransactionCard from "@/components/shared/TransactionCard";

export default function TransactionsPage() {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Transactions</h1>
          <div className="w-full sm:w-60 lg:hidden">
            <AddNewTransaction />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
      </div>
      <Paginate />
    </section>
  );
}
