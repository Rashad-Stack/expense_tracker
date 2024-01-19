import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-lg font-bold">Categories</h1>
            <div className="w-full sm:w-60 lg:hidden">
              <Skeleton className="h-5 w-10 rounded-full" />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className="h-20 w-full rounded-md" key={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-rows-[auto_1fr] gap-5">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-lg font-bold">Transactions</h1>
            <div className="w-full sm:w-60 lg:hidden">
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="flex justify-between">
            <h2 className="text-base font-bold">Recent</h2>
            <Skeleton className="h-3 w-10 rounded-sm" />
          </div>
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton className="h-16 w-full rounded-md" key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
