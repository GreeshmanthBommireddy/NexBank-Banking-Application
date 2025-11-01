"use client";

import { useState, useMemo } from "react";
import { formatAmount } from "@/lib/utils";
import { Plus, Target, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BudgetTrackerProps {
  transactions: Transaction[];
  accounts: Account[];
}

const BudgetTracker = ({ transactions, accounts }: BudgetTrackerProps) => {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "Food and Drink", limit: 500, spent: 0 },
    { id: 2, category: "Travel", limit: 1000, spent: 0 },
    { id: 3, category: "Shopping", limit: 800, spent: 0 },
  ]);

  const budgetAnalysis = useMemo(() => {
    const analysis = budgets.map((budget) => {
      const spent = transactions
        .filter(
          (t) =>
            t.category === budget.category &&
            t.amount < 0 &&
            new Date(t.date).getMonth() === new Date().getMonth()
        )
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);

      const remaining = budget.limit - spent;
      const percentage = (spent / budget.limit) * 100;

      return {
        ...budget,
        spent,
        remaining,
        percentage: Math.min(percentage, 100),
        status: percentage >= 100 ? "exceeded" : percentage >= 80 ? "warning" : "good",
      };
    });

    return analysis;
  }, [transactions, budgets]);

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgetAnalysis.reduce((sum, b) => sum + b.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const addBudget = () => {
    const newBudget = {
      id: Date.now(),
      category: "New Category",
      limit: 0,
      spent: 0,
    };
    setBudgets([...budgets, newBudget]);
    toast.success("Budget category added");
  };

  return (
    <div className="space-y-8">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {formatAmount(totalBudget)}
              </p>
            </div>
            <Target className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="mt-2 text-2xl font-bold text-pink-600">
                {formatAmount(totalSpent)}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-pink-500" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p
                className={`mt-2 text-2xl font-bold ${
                  remainingBudget < 0 ? "text-red-600" : "text-success-600"
                }`}
              >
                {formatAmount(remainingBudget)}
              </p>
            </div>
            <CheckCircle2
              className={`h-8 w-8 ${remainingBudget < 0 ? "text-red-500" : "text-success-500"}`}
            />
          </div>
        </div>
      </div>

      {/* Budget Categories */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Budget Categories</h3>
          <Button onClick={addBudget} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        </div>

        <div className="space-y-6">
          {budgetAnalysis.map((budget) => (
            <div key={budget.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{budget.category}</h4>
                  <p className="text-sm text-gray-600">
                    {formatAmount(budget.spent)} of {formatAmount(budget.limit)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      budget.status === "exceeded"
                        ? "text-red-600"
                        : budget.status === "warning"
                        ? "text-yellow-600"
                        : "text-success-600"
                    }`}
                  >
                    {budget.percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatAmount(budget.remaining)} left
                  </p>
                </div>
              </div>

              <div className="h-3 w-full rounded-full bg-gray-200">
                <div
                  className={`h-3 rounded-full transition-all ${
                    budget.status === "exceeded"
                      ? "bg-red-500"
                      : budget.status === "warning"
                      ? "bg-yellow-500"
                      : "bg-success-500"
                  }`}
                  style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                />
              </div>

              {budget.status === "exceeded" && (
                <p className="text-sm text-red-600">
                  ⚠️ Budget exceeded! You've spent {formatAmount(budget.spent - budget.limit)}{" "}
                  over your limit.
                </p>
              )}
              {budget.status === "warning" && (
                <p className="text-sm text-yellow-600">
                  ⚠️ You're close to your budget limit.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Budget Goals */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Financial Goals</h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Emergency Fund</p>
                <p className="text-sm text-gray-600">Target: $10,000</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">25% Complete</p>
                <div className="mt-2 h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-8 rounded-full bg-success-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Vacation Fund</p>
                <p className="text-sm text-gray-600">Target: $5,000</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">60% Complete</p>
                <div className="mt-2 h-2 w-32 rounded-full bg-gray-200">
                  <div className="h-2 w-20 rounded-full bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;

