import AddNewCategory from "@/components/shared/AddNewCategory";
import AddNewTransaction from "@/components/shared/AddNewTransaction";
import CategoryCard from "@/components/shared/CategoryCard";
import TransactionCard from "@/components/shared/TransactionCard";
import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Dashboard() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const categories = await prisma.category.findMany({
    where: {
      userId: userId,
    },

    take: 4,
  });

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
    take: 5,
  });

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
            {categories.length > 0 &&
              categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
          </div>
        </div>
      </section>

      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-lg font-bold">Transactions</h1>
            <div className="w-full sm:w-60 lg:hidden">
              <AddNewTransaction />
            </div>
          </div>

          <div className="flex justify-between">
            <h2 className="text-base font-bold">Today</h2>
            <Link href="/" className="text-sm">
              View all
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {transactions.length > 0 &&
              transactions.map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
