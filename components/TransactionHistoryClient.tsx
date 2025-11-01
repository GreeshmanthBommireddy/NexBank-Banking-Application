"use client";

import { useState } from "react";
import TransactionsTable from "@/components/TransactionsTable";
import TransactionFilters from "@/components/TransactionFilters";
import { Pagination } from "@/components/Pagination";

interface TransactionHistoryClientProps {
  initialTransactions: Transaction[];
}

const TransactionHistoryClient = ({
  initialTransactions,
}: TransactionHistoryClientProps) => {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(
    initialTransactions
  );
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <div className="space-y-6">
      <TransactionFilters
        transactions={initialTransactions}
        onFilter={setFilteredTransactions}
      />
      <section className="flex w-full flex-col gap-6">
        <TransactionsTable transactions={currentTransactions} />
        {totalPages > 1 && (
          <div className="my-4 w-full">
            <Pagination totalPages={totalPages} page={currentPage} />
          </div>
        )}
      </section>
    </div>
  );
};

export default TransactionHistoryClient;

