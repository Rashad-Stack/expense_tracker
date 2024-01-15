import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import AddNewCategory from "./AddNewCategory";
import AddNewTransaction from "./AddNewTransaction";

export default function Sidebar() {
  return (
    <aside className="space-y-8 p-4 max-lg:hidden">
      <div className="flex flex-col items-center space-y-2 rounded-md bg-slate-100 p-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="text-sm font-semibold">Welcome Rashad</h2>
        <Button size="sm">Logout</Button>
      </div>
      <div className="flex flex-col gap-4">
        <AddNewCategory />
        <AddNewTransaction />
      </div>
    </aside>
  );
}
