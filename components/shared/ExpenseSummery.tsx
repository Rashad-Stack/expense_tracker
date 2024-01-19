import { getAllCategories } from "@/lib/actions/category.action";

export default async function ExpenseSummery() {
  const categoryData = await getAllCategories({
    page: 1,
    limit: 100,
  });

  const { categories, netAmount } = categoryData || {};

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Expense Summery</h2>
      <div className="flex flex-col space-y-2">
        {categories &&
          categories.map((category) => (
            <div className="flex justify-between" key={category.id}>
              <span className="line-clamp-1 max-w-32 text-sm">
                {category.name}
              </span>
              <span className="text-sm">
                ${category.totalAmount.toFixed(2)}
              </span>
            </div>
          ))}

        <div className="flex justify-between border-t">
          <span className="font-medium">Total</span>
          <span className="font-medium">
            ${netAmount ? netAmount?.toFixed(2) : 0.0}
          </span>
        </div>
      </div>
    </div>
  );
}
