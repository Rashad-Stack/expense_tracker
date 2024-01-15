import Link from "next/link";
import { HiArrowLongRight } from "react-icons/hi2";

export default function CategoryCard() {
  return (
    <Link
      href="/"
      className="group flex w-full items-center rounded-md bg-primary px-8 py-4 text-primary-foreground hover:bg-primary/90 sm:max-w-xs"
    >
      <div className="flex h-full w-16 items-center">
        <h1 className="text-center text-4xl font-bold uppercase">B</h1>
      </div>
      <div>
        <h3>Book Shop Book</h3>
        <p>$0.00</p>
      </div>

      <span className="ml-auto hidden group-hover:block">
        <HiArrowLongRight className="h-6 w-10" />
      </span>
    </Link>
  );
}
