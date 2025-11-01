"use client";

import { formatAmount } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useMemo } from "react";

interface DashboardStatsProps {
  transactions: Transaction[];
  totalBalance: number;
}

const DashboardStats = ({ transactions, totalBalance }: DashboardStatsProps) => {
  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "depository" || t.amount > 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const expenses = transactions
      .filter((t) => t.type !== "depository" && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netChange = income - expenses;
    const transactionCount = transactions.length;

    return {
      income,
      expenses,
      netChange,
      transactionCount,
    };
  }, [transactions]);

  const statCards = [
    {
      title: "Total Income",
      value: formatAmount(stats.income),
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success-600",
      bgColor: "bg-success-25",
    },
    {
      title: "Total Expenses",
      value: formatAmount(stats.expenses),
      change: "-5.2%",
      trend: "down",
      icon: TrendingDown,
      color: "text-pink-600",
      bgColor: "bg-pink-25",
    },
    {
      title: "Net Change",
      value: formatAmount(stats.netChange),
      change: stats.netChange >= 0 ? "+7.3%" : "-7.3%",
      trend: stats.netChange >= 0 ? "up" : "down",
      icon: DollarSign,
      color: stats.netChange >= 0 ? "text-blue-600" : "text-gray-600",
      bgColor: stats.netChange >= 0 ? "bg-blue-25" : "bg-gray-25",
    },
    {
      title: "Transactions",
      value: stats.transactionCount.toString(),
      change: "+24",
      trend: "up",
      icon: ArrowUpRight,
      color: "text-indigo-600",
      bgColor: "bg-indigo-25",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              {stat.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-success-600" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-pink-600" />
              )}
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
              <p
                className={`mt-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-success-600" : "text-pink-600"
                }`}
              >
                {stat.change} from last month
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;

