import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiMiniPlus } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddNewCategory() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
        <HiMiniPlus className="h-6 w-6" /> <span>Add New</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Expense Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}