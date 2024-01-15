import AddNewCategory from "@/components/shared/AddNewCategory";
import CategoryCard from "@/components/shared/CategoryCard";

export default function Home() {
  return (
    <>
      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div className="space-y-8">
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Categories</h1>
            <AddNewCategory />
          </div>

          <div className="flex flex-wrap gap-2">
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
      </section>

      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div>
          <div className="flex justify-between">
            <h1 className="text-lg font-bold">Transactions</h1>
          </div>
        </div>
      </section>
    </>
  );
}
