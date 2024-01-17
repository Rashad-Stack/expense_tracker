"use sever";

import prisma from "@/prisma/db";
import { CreateCategoryParams, GetCategoryByIdParams } from "@/types";
import { auth } from "@clerk/nextjs";
import { Category } from "@prisma/client";
import { handleError } from "../utils";

export async function createCategory(
  data: CreateCategoryParams,
): Promise<Category | void> {
  try {
    return await prisma.category.create({ data });
  } catch (error) {
    handleError(error);
  }
}
export async function getAllCategories({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const skipAmount = (Number(page) - 1) * limit;

  try {
    const [categories, groupCategories, totalCategory] = await Promise.all([
      prisma.category.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: skipAmount,
      }),
      prisma.transaction.groupBy({
        by: ["categoryId"],
        where: {
          userId,
        },
        _sum: {
          amount: true,
        },
      }),

      prisma.category.count({
        where: {
          userId,
        },
      }),
    ]);

    const categoryWithTotalAmount = categories.map((category: Category) => {
      const categorySum = groupCategories.find(
        (groupCategory) => groupCategory.categoryId === category.id,
      );

      return {
        ...category,
        totalAmount: categorySum?._sum?.amount || 0,
      };
    });

    const totalPages = Math.ceil(totalCategory / limit);

    return { categories: categoryWithTotalAmount, totalPages };
  } catch (error) {
    handleError(error);
  }
}

export async function getCategoryById({
  categoryId,
  page,
  limit,
}: GetCategoryByIdParams) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const skipAmount = (Number(page) - 1) * limit;

  try {
    const [category, totalAmount, transactions, totalTransactions] =
      await Promise.all([
        prisma.category.findUnique({
          where: {
            userId,
            id: categoryId,
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

        prisma.transaction.findMany({
          where: {
            userId: userId,
            categoryId: categoryId,
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

    const pages = Math.ceil(totalTransactions / limit);

    return {
      category,
      totalTransactionAmount: totalAmount?._sum?.amount || 0,
      transactions,
      totalPages: pages,
    };
  } catch (error) {
    handleError(error);
  }
}
export async function updateCategory() {}
export async function deleteCategory() {}
