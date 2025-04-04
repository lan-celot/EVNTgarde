const BudgetBreakdown: React.FC = () => {
  return (
    <div className="w-60 p-5 ml-45 bg-white rounded-md shadow-md">
      {/* Budget Breakdown Title */}
      <div className="mb-2 h-5 rounded text-sm font-semibold">
        Budget Breakdown
      </div>
      {/* Total Expenses (Title + Value in a gray background) */}
      <div className="mb-2 p-2 bg-gray-100 rounded">
        <div className="text-xs font-medium">Total Expenses</div>
        <div className="text-md font-medium text-red-800">Php 4,500</div>
      </div>
      {/* Budget Items */}
      <div className="mb-1 h-5 rounded text-sm">
        Item 1 <span className="text-red-800"> -1,000</span>
      </div>
      <div className="mb-1 h-5 rounded text-sm">
        Item 2 <span className="text-red-800"> -1,000</span>
      </div>
      <div className="mb-1 h-5 rounded text-sm">
        Item 3 <span className="text-red-800"> -1,000</span>
      </div>
      <div className="mb-1 h-5 rounded text-sm">
        Item 4 <span className="text-red-800"> -1,000</span>
      </div>
    </div>
  );
};

export default BudgetBreakdown;
