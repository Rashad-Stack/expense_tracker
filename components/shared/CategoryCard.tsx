import { Category } from "@prisma/client";
import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, name } = category || {};
  return (
    <Link
      href={`/dashboard/categories/${id}`}
      className="group flex w-full items-center rounded-md bg-primary px-8 py-4 text-primary-foreground hover:bg-primary/90"
    >
      <div className="flex h-full w-16 items-center">
        <h1 className="text-center text-4xl font-bold uppercase">
          {name.charAt(0)}
        </h1>
      </div>
      <div>
        <h3 className="capitalize">{name}</h3>
        <p>$0.00</p>
      </div>

      <span className="ml-auto hidden group-hover:block">
        <HiArrowLongRight className="h-6 w-10" />
      </span>
    </Link>
  );
}
