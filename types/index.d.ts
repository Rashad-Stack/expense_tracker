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

export type UpdateCategoryParams = {
  name: string;
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type ICategory = Category & {
  totalAmount: number;
}

export type GetCategoryParams = {
  take?: number;
}