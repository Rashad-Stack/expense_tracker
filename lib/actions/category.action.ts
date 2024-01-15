"use sever";

import prisma from "@/prisma/db";
import { CreateCategoryParams } from "@/types";
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
export async function getAllCategories() {}
export async function getCategoryById() {}
export async function updateCategory() {}
export async function deleteCategory() {}
