import DeleteCategory from "@/components/shared/DeleteCategory";
import Paginate from "@/components/shared/Paginate";
import TransactionCard from "@/components/shared/TransactionCard";
import UpdateCategory from "@/components/shared/UpdateCategory";

export default function CategoryDetailsPage() {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-4 rounded-md bg-slate-100 p-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">Book Shop Book</h2>
          <h1 className="text-2xl font-bold">$3300.00</h1>
        </div>
        <div className="w-48 space-y-4">
          <UpdateCategory />
          <DeleteCategory />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Transactions</h1>
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
