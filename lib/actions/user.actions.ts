"use server";
import { CreateUserParams, UpdateUserParams } from "@/types";
import { PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils";
const prisma = new PrismaClient();

export async function createUser(user: CreateUserParams): Promise<User | void> {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(
  id: string,
  user: UpdateUserParams,
): Promise<User | void> {
  try {
    return await prisma.user.update({
      where: { id },
      data: user,
    });
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(id: string): Promise<void> {
  try {
    // Find user to delete
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Unlink relationships
    const deleteCategories = prisma.category.deleteMany({
      where: { userId: user.id },
    });

    const deleteTransactions = prisma.transaction.deleteMany({
      where: { userId: user.id },
    });

    const deleteUser = prisma.user.delete({
      where: { id: user.id },
    });

    await prisma.$transaction([
      deleteCategories,
      deleteTransactions,
      deleteUser,
    ]);
  } catch (error) {
    handleError(error);
  }
}
