import AddNewTransaction from "@/components/shared/AddNewTransaction";
import Paginate from "@/components/shared/Paginate";
import TransactionCard from "@/components/shared/TransactionCard";
import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";

export default async function TransactionsPage() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

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
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                categoryName={transaction.category.name}
              />
            ))}
        </div>
      </div>
      <Paginate />
    </section>
  );
}
