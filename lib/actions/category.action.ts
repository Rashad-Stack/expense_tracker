"use sever";

import { Category, Prisma, PrismaClient } from "@prisma/client";
import { handleError } from "../utils";

const prisma = new PrismaClient();

export async function createCategory(
  data: Prisma.CategoryCreateInput,
): Promise<Category | void> {
  try {
    return await prisma.category.create({ data });
  } catch (error) {
    handleError(error);
  }
}
export async function getAllCategories() {}
export async function getCategoryById() {}
export async function updateCategory() {}
export async function deleteCategory() {}
