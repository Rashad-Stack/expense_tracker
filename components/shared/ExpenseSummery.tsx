export default function ExpenseSummery() {
  return (
    <div>
      <h2 className="text-sm font-semibold">Expense Summery</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between">
          <span>Grocery Shop</span>
          <span>₹ 0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Expense</span>
          <span>₹ 0.00</span>
        </div>
        <div className="flex justify-between">
          <span>Balance</span>
          <span>₹ 0.00</span>
        </div>
      </div>
    </div>
  );
}
