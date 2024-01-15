import AddNewCategory from "@/components/shared/AddNewCategory";

export default function Home() {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">Categories</h1>
          <AddNewCategory />
        </div>
      </div>
    </section>
  );
}
