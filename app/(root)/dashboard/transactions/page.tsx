import AddNewTransaction from "@/components/shared/AddNewTransaction";
import AlertMessage from "@/components/shared/AlertMessage";
import Paginate from "@/components/shared/Paginate";
import TransactionCard from "@/components/shared/TransactionCard";
import { getAllTransaction } from "@/lib/actions/transaction.action";
import { SearchParamProps } from "@/types";

export default async function TransactionsPage({
  searchParams,
}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const category = searchParams?.category as string;
  const search = searchParams?.query as string;
  const transactionData = await getAllTransaction({
    page,
    limit: 5,
    categoryId: category,
    search,
  });

  const { transactions, totalPages } = transactionData || {};

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
          {transactions && transactions.length > 0 ? (
            transactions?.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                categoryName={transaction.category.name}
              />
            ))
          ) : (
            <AlertMessage />
          )}
        </div>
      </div>
      {totalPages! > 1 && <Paginate page={page} totalPages={totalPages!} />}
    </section>
  );
}
