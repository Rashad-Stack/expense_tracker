import { HiMagnifyingGlass } from "react-icons/hi2";
import { Input } from "../ui/input";

export default function Search() {
  return (
    <div className="flex h-3 flex-1 items-center overflow-hidden border-b px-4 py-5">
      <HiMagnifyingGlass className="h-5 w-5 text-gray-400" />
      <Input
        className="border-0 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Search"
      />
    </div>
  );
}
