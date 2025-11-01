"use client";

import { useMemo } from "react";
import { formatAmount } from "@/lib/utils";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { TrendingUp, TrendingDown, DollarSign, Calendar, PieChart as PieChartIcon } from "lucide-react";

interface AnalyticsDashboardProps {
  transactions: Transaction[];
  accounts: Account[];
  totalBalance: number;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const AnalyticsDashboard = ({ transactions, accounts, totalBalance }: AnalyticsDashboardProps) => {
  const analytics = useMemo(() => {
    // Monthly spending data
    const monthlyData: { [key: string]: number } = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (t.amount < 0) {
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Math.abs(t.amount);
      }
    });

    const monthlyChart = Object.entries(monthlyData)
      .sort()
      .slice(-6)
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short' }),
        amount,
      }));

    // Category breakdown
    const categoryData: { [key: string]: number } = {};
    transactions.forEach((t) => {
      if (t.amount < 0) {
        const category = t.category || 'Other';
        categoryData[category] = (categoryData[category] || 0) + Math.abs(t.amount);
      }
    });

    const categoryChart = Object.entries(categoryData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));

    // Income vs Expenses
    const income = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      monthlyChart,
      categoryChart,
      income,
      expenses,
      netWorth: totalBalance,
    };
  }, [transactions, totalBalance]);

  const COLORS = ['#0179FE', '#039855', '#EE46BC', '#667085', '#F2F4F7'];

  const stats = [
    {
      title: "Total Income",
      value: formatAmount(analytics.income),
      icon: TrendingUp,
      color: "text-success-600",
      bgColor: "bg-success-25",
      trend: "+12.5%",
    },
    {
      title: "Total Expenses",
      value: formatAmount(analytics.expenses),
      icon: TrendingDown,
      color: "text-pink-600",
      bgColor: "bg-pink-25",
      trend: "-5.2%",
    },
    {
      title: "Net Worth",
      value: formatAmount(analytics.netWorth),
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-25",
      trend: "+7.3%",
    },
    {
      title: "Transactions",
      value: transactions.length.toString(),
      icon: Calendar,
      color: "text-indigo-600",
      bgColor: "bg-indigo-25",
      trend: "+24",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Spending */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Monthly Spending</h3>
          <div className="h-[300px]">
            <Bar
              data={{
                labels: analytics.monthlyChart.map((d) => d.month),
                datasets: [
                  {
                    label: "Spending",
                    data: analytics.monthlyChart.map((d) => d.amount),
                    backgroundColor: "#0179FE",
                    borderColor: "#0179FE",
                    borderWidth: 1,
                    borderRadius: 8,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => formatAmount(Number(context.parsed)),
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return formatAmount(Number(value));
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Spending by Category</h3>
          <div className="h-[300px]">
            <Doughnut
              data={{
                labels: analytics.categoryChart.map((c) => c.name),
                datasets: [
                  {
                    label: "Spending",
                    data: analytics.categoryChart.map((c) => c.value),
                    backgroundColor: COLORS,
                    borderColor: COLORS,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = formatAmount(Number(context.parsed));
                        const total = analytics.categoryChart.reduce((sum, c) => sum + c.value, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Spending Insights</h3>
        <div className="space-y-4">
          {analytics.categoryChart.map((category, index) => {
            const percentage = (category.value / analytics.expenses) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatAmount(category.value)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

