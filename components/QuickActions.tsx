"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Send, Download, Receipt, CreditCard, TrendingUp, Settings } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      label: "Send Money",
      icon: Send,
      href: "/payment-transfer",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "View Statements",
      icon: Receipt,
      href: "/transaction-history",
      color: "bg-success-500 hover:bg-success-600",
    },
    {
      label: "Cards",
      icon: CreditCard,
      href: "/my-banks",
      color: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      label: "Analytics",
      icon: TrendingUp,
      href: "/",
      color: "bg-pink-500 hover:bg-pink-600",
    },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className={`flex h-auto flex-col items-center justify-center gap-2 p-4 transition-all hover:scale-105 ${action.color} border-0 text-white`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

