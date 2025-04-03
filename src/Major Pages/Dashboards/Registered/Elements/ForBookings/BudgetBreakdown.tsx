"use client"

import type React from "react"
import { useMemo } from "react"
import { Car } from "lucide-react"

interface BudgetItem {
  name: string
  amount: number
}

interface BudgetBreakdownProps {
  items?: BudgetItem[]
  additionalExpenses?: number // For any expenses not in the items list
}

const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  items = [
    { name: "Artist Transportation", amount: -230 },
    { name: "Artist Transportation", amount: -230 },
    { name: "Artist Transportation", amount: -230 },
    { name: "Artist Transportation", amount: -230 },
  ],
  additionalExpenses = 560000, // Base expenses (e.g., catering services)
}) => {
  // Calculate total expenses from items plus any additional expenses
  const totalExpense = useMemo(() => {
    const itemsTotal = items.reduce((sum, item) => sum + item.amount, 0)
    return additionalExpenses + itemsTotal
  }, [items, additionalExpenses])

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount)
    return amount < 0
      ? `-${absAmount.toFixed(2)}`
      : absAmount.toLocaleString("en-PH", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-2">Budget Breakdown</h3>

      <div className="mb-4">
        <div className="text-sm text-gray-500">Total Expenses</div>
        <div className="text-xl font-bold text-red-600">Php {formatCurrency(totalExpense)}</div>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 p-1 rounded-full">
                <Car size={16} className="text-gray-600" />
              </div>
              <span>{item.name}</span>
            </div>
            <span className="text-red-600 font-medium">{formatCurrency(item.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetBreakdown