"use sever";

import prisma from "@/prisma/db";
import { CreateCategoryParams, GetCategoryParams } from "@/types";
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
export async function getAllCategories({take}:GetCategoryParams) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  try {
    const [categories, groupCategories] = await Promise.all([
    prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take
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
  ]);

  const categoryWithTotalAmount = categories.map((category:Category) => {

      const categorySum = groupCategories.find(
        (groupCategory) => groupCategory.categoryId === category.id,
      );
      
      return {
        ...category,
        totalAmount: categorySum?._sum?.amount || 0,
    
      }
 
  })


  return categoryWithTotalAmount

  } catch (error) {
     handleError(error);
  }

}

export async function getCategoryById() {}
export async function updateCategory() {}
export async function deleteCategory() {}
