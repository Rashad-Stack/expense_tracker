import DeleteCategory from "@/components/shared/DeleteCategory";
import Paginate from "@/components/shared/Paginate";
import TransactionCard from "@/components/shared/TransactionCard";
import UpdateCategory from "@/components/shared/UpdateCategory";
import { getCategoryById } from "@/lib/actions/category.action";
import { SearchParamProps } from "@/types";

export default async function CategoryDetailsPage({
  params,
  searchParams,
}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const categoryId = params?.id as string;

  const categoryData = await getCategoryById({ categoryId, limit: 5, page });

  const { category, totalTransactionAmount, transactions, totalPages } =
    categoryData || {};

  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-4 rounded-md bg-slate-100 p-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">{category?.name}</h2>
          <h1 className="text-2xl font-bold">
            ${totalTransactionAmount?.toFixed(2)}
          </h1>
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
          {transactions!.length > 0 &&
            transactions?.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                categoryName={category!.name}
                transaction={transaction}
              />
            ))}
        </div>
      </div>

      {totalPages! > 1 && <Paginate page={page} totalPages={totalPages!} />}
    </section>
  );
}
