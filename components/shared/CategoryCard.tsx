import Link from "next/link";

export default function CategoryCard() {
  return (
    <Link
      href="/"
      className="w-full rounded-md bg-primary px-8 py-4 text-primary-foreground hover:bg-primary/90 sm:max-w-xs"
    >
      <h3>Book Shop Book</h3>
      <p>$0.00</p>
    </Link>
  );
}
