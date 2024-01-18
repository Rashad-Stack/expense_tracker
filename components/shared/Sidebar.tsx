import { UserButton, currentUser } from "@clerk/nextjs";
import AddNewCategory from "./AddNewCategory";
import AddNewTransaction from "./AddNewTransaction";

export default async function Sidebar() {
  const user = await currentUser();

  return (
    <aside className="space-y-8 p-4 max-lg:hidden">
      <div className="flex flex-col items-center space-y-2 rounded-md bg-slate-100 p-4">
        <UserButton afterSignOutUrl="/" />
        <h2 className="text-sm font-semibold">Welcome {user?.firstName}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <AddNewCategory />
        <AddNewTransaction />
      </div>
    </aside>
  );
}
