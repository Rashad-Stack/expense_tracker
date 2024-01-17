"use server";

import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { handleError } from "../utils";

type GetTransactionByCategoryParams = {
  categoryId: string;
};

export async function getTransactionByCategory({
  categoryId,
}: GetTransactionByCategoryParams) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          userId: userId,
          categoryId: categoryId,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      }),

      prisma.transaction.aggregate({
        where: {
          userId: userId,
          categoryId: categoryId,
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    return {
      transactions,
      totalAmount: total._sum.amount,
    };
  } catch (error) {
    handleError(error);
  }
}
