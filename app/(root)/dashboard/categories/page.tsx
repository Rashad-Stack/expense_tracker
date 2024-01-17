import AddNewCategory from "@/components/shared/AddNewCategory";
import CategoryCard from "@/components/shared/CategoryCard";
import Paginate from "@/components/shared/Paginate";
import { getAllCategories } from "@/lib/actions/category.action";
import { SearchParamProps } from "@/types";

export default async function CategoryPage({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;

  const categoryData = await getAllCategories({
    page,
    limit: 10,
  });

  const { categories, totalPages } = categoryData || {};

  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Categories</h1>
          <div className="w-full sm:w-60 lg:hidden">
            <AddNewCategory />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {categories!.length > 0 &&
            categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </div>
      {totalPages! > 1 && <Paginate page={page} totalPages={totalPages!} />}
    </section>
  );
}
