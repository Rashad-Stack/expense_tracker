import { SpendType } from "@prisma/client";
import { z } from "zod";

export const transactionSchema = z.object({
  title: z.string().min(3).max(255),
  date: z.string(),
  amount: z.string(),
  spendType: z.nativeEnum(SpendType),
  categoryId: z.string(),
});

export const transactionPatchSchema = z.object({
  title: z.string().min(3).max(255),
  date: z.string(),
  amount: z.string(),
  spendType: z.nativeEnum(SpendType),
  categoryId: z.string(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category is required!").max(255),
});
