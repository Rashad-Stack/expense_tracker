import AddNewCategory from "@/components/shared/AddNewCategory";
import CategoryCard from "@/components/shared/CategoryCard";
import Paginate from "@/components/shared/Paginate";
import { getAllCategories } from "@/lib/actions/category.action";

export default async function CategoryPage() {
  const categories = (await getAllCategories({})) || [];

  console.log(
    "🚀 ~ file: page.tsx:26 ~ CategoryPage ~ groupCategories:",
    categories,
  );

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
          {categories.length > 0 &&
            categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </div>
      <Paginate />
    </section>
  );
}
