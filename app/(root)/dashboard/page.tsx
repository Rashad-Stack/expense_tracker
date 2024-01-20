import AddNewCategory from "@/components/shared/AddNewCategory";
import AddNewTransaction from "@/components/shared/AddNewTransaction";
import AlertMessage from "@/components/shared/AlertMessage";
import CategoryCard from "@/components/shared/CategoryCard";
import TransactionCard from "@/components/shared/TransactionCard";
import { getAllCategories } from "@/lib/actions/category.action";
import { getAllTransaction } from "@/lib/actions/transaction.action";
import { SearchParamProps } from "@/types";
import { intlFormatDistance } from "date-fns";
import Link from "next/link";

export default async function Dashboard({ searchParams }: SearchParamProps) {
  const category = searchParams?.category as string;
  const search = searchParams?.query as string;

  const categoryData = await getAllCategories({
    page: 1,
    limit: 4,
  });
  const transactionData = await getAllTransaction({
    page: 1,
    limit: 4,
    categoryId: category,
    search,
  });

  const { categories } = categoryData || {};
  const { transactions } = transactionData || {};
  const lastTransaction = transactions?.[0]?.date;

  return (
    <>
      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-lg font-bold">Categories</h1>
            <div className="w-full sm:w-60 lg:hidden">
              <AddNewCategory />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {categories && categories.length > 0 ? (
              categories?.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) : (
              <AlertMessage />
            )}
          </div>
        </div>
      </section>
      {categories && categories!.length > 0 && (
        <section className="grid grid-rows-[auto_1fr] gap-5">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-lg font-bold">Transactions</h1>
              <div className="w-full sm:w-60 lg:hidden">
                <AddNewTransaction />
              </div>
            </div>

            <div className="flex justify-between">
              <h2 className="text-base font-bold">
                {intlFormatDistance(
                  lastTransaction ? lastTransaction : new Date(),
                  new Date(),
                  { locale: "en" },
                )}
              </h2>
              <Link href="/dashboard/transactions" className="text-sm">
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {transactions && transactions.length > 0 ? (
                transactions?.map((transaction) => (
                  <TransactionCard
                    categoryName={transaction.category.name}
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <AlertMessage />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
