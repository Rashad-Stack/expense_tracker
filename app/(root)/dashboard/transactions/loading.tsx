import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Transactions</h1>
          <div className="w-full sm:w-60 lg:hidden">
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 15 }).map((_, index) => (
            <Skeleton className="h-16 w-full rounded-md" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
