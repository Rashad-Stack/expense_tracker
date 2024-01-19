"use server";

import prisma from "@/prisma/db";
import { GetAllTransactionParams } from "@/types";
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

export async function getAllTransaction({
  page,
  limit,
  categoryId,
  search,
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
          title: {
            contains: search,
          },
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
          title: {
            contains: search,
          },
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

export async function getTransactionAnalysis() {
  try {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const [totalIncome, totalExpense] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          userId: userId,
          spendType: "INCOME",
        },
        select: {
          id: true,
          amount: true,
          title: true,
        },
      }),

      prisma.transaction.findMany({
        where: {
          userId: userId,
          spendType: "EXPENSE",
        },
        select: {
          id: true,
          amount: true,
          title: true,
        },
      }),
    ]);

    const refactoredIncome = totalExpense.map((income) => ({
      ...income,
      amount: Math.abs(income.amount || 0),
    }));

    return {
      totalIncome,
      totalExpense: refactoredIncome,
    };
  } catch (error) {
    handleError(error);
  }
}
