import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="grid grid-rows-[auto_1fr] gap-5">
      <div className="space-y-4 rounded-md bg-slate-100 p-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold capitalize">
            <Skeleton className="h-5 w-10 rounded-full" />
          </h2>
          <h1 className="text-2xl font-bold">
            <Skeleton className="h-5 w-10 rounded-full" />
          </h1>
        </div>
        <div className="w-48 space-y-4">
          <Skeleton className="h-5 w-10 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-lg font-bold">Transactions</h1>
        </div>

        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="h-16 w-full rounded-md" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
