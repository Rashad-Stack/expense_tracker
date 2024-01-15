import AddNewCategory from "@/components/shared/AddNewCategory";
import CategoryCard from "@/components/shared/CategoryCard";
import Paginate from "@/components/shared/Paginate";

export default function CategoryPage() {
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
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
      <Paginate />
    </section>
  );
}
