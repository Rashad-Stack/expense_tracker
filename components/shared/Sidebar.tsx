import { UserButton, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import AddNewCategory from "./AddNewCategory";
import AddNewTransaction from "./AddNewTransaction";

export default async function Sidebar() {
  const user = await currentUser();

  return (
    <aside className="space-y-8 p-4 max-lg:hidden">
      <div className="flex flex-col items-center space-y-2 rounded-md bg-slate-100 p-4">
        <Suspense fallback={<Skeleton className="h-10 w-10 rounded-full" />}>
          <UserButton afterSignOutUrl="/" />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-8 w-full rounded-md" />}>
          <h2 className="text-sm font-semibold">Welcome {user?.firstName}</h2>
        </Suspense>
      </div>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
          <AddNewCategory />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-10 w-full rounded-md" />}>
          <AddNewTransaction />
        </Suspense>
      </div>
    </aside>
  );
}
