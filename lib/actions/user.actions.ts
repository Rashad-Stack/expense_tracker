"use server";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { handleError } from "../utils";
const prisma = new PrismaClient();

export async function createUser(
  user: Prisma.UserCreateInput,
): Promise<User | void> {
  try {
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(
  clerkId: string,
  user: Prisma.UserUpdateInput,
): Promise<User | void> {
  try {
    return await prisma.user.update({
      where: { clerkId },
      data: user,
    });
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string): Promise<void> {
  try {
    // Find user to delete
    const user = await prisma.user.findUnique({
      where: { clerkId },
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
