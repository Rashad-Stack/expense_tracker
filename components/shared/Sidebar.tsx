import { getTransactionAnalysis } from "@/lib/actions/transaction.action";
import { UserButton, currentUser } from "@clerk/nextjs";
import AddNewCategory from "./AddNewCategory";
import AddNewTransaction from "./AddNewTransaction";
import ExpenseChart from "./ExpenseChart";
import ExpenseSummery from "./ExpenseSummery";

export default async function Sidebar() {
  const user = await currentUser();
  const analysisData = await getTransactionAnalysis();

  const { totalIncome, totalExpense } = analysisData || {};

  return (
    <aside className="space-y-6 p-4 max-lg:hidden">
      <div className="flex flex-col items-center space-y-2 rounded-md bg-slate-100 p-4">
        <UserButton afterSignOutUrl="/" />
        <h2 className="text-sm font-semibold">Welcome {user?.firstName}</h2>
      </div>
      <div className="space-y-2 rounded-md bg-slate-100 p-4">
        <ExpenseSummery />
      </div>
      <div className="space-y-2 rounded-md bg-slate-100 px-4 py-2">
        <ExpenseChart data={totalIncome!} color="#001f3f" chartName="Income" />
      </div>
      <div className="space-y-2 rounded-md bg-slate-100 px-4 py-2">
        <ExpenseChart
          data={totalExpense!}
          color="#FF0000"
          chartName="Expense"
        />
      </div>
      <div className="flex flex-col gap-4">
        <AddNewCategory />
        <AddNewTransaction />
      </div>
    </aside>
  );
}
