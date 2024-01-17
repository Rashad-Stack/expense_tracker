"use server";

import prisma from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { handleError } from "../utils";

type GetTransactionByCategoryParams = {
  categoryId: string;
  page: number;
  limit: number;
  search: string;
};

export async function getTransactionByCategory({
  categoryId,
  page,
  limit,
  search,
}: GetTransactionByCategoryParams) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const skipAmount = (Number(page) - 1) * limit;

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
        orderBy: {
          createdAt: "desc",
        },
        skip: skipAmount,
        take: limit,
      }),

      prisma.transaction.count({
        where: {
          userId: userId,
          categoryId: categoryId,
        },
      }),
    ]);

    return {
      transactions,
      totalTransaction: total,
    };
  } catch (error) {
    handleError(error);
  }
}

type GetAllTransactionParams = {
  page: number;
  limit: number;
  categoryId: string;
};
export async function getAllTransaction({
  page,
  limit,
  categoryId,
}: GetAllTransactionParams) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const skipAmount = (Number(page) - 1) * limit;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          userId: userId,
          categoryId,
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
        skip: skipAmount,
        take: limit,
      }),

      prisma.transaction.count({
        where: {
          userId: userId,
          categoryId,
        },
      }),
    ]);

    const pages = Math.ceil(total / limit);

    return {
      transactions,
      totalPages: pages,
    };
  } catch (error) {
    handleError(error);
  }
}
