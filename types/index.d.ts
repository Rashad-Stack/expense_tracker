import { z } from "zod";
import {
  categorySchema,
  transactionPatchSchema,
  transactionSchema,
} from "./validator";

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  photo: string;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  name: string;
  userId: string;
};

export type GetCategoryByIdParams = {
  categoryId: string;
  limit: number;
  page: number;
  search: string;
};

export type UpdateCategoryParams = {
  name: string;
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type ICategory = Category & {
  totalAmount: number;
};

export type GetCategoryParams = {
  limit: number;
  page: number;
};

export type CategoryCreateDto = z.infer<typeof categorySchema>;

// ====== TRANSACTION PARAMS

export type TransactionCreateDto = z.infer<typeof transactionSchema>;
export type TransactionUpdateDto = z.infer<typeof transactionPatchSchema>;
export type GetAllTransactionParams = {
  page: number;
  limit: number;
  categoryId: string;
  search: string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
