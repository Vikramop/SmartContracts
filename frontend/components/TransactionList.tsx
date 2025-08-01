import React, { useEffect, useState } from 'react';
import { Transaction } from '../types/token';
import { fetchTransactions } from '../utils/tokenApi';

const TransactionList: React.FC<{ address: string }> = ({ address }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTransactions(address)
      .then(setTransactions)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [address]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!transactions.length) return <p>No transactions yet.</p>;

  return (
    <ul className="space-y-2">
      {transactions.map((tx) => (
        <li key={tx.id} className="p-2 border rounded">
          <p>
            <strong>{tx.type.toUpperCase()}</strong> of {tx.amount} tokens
          </p>
          <p>From: {tx.from}</p>
          <p>To: {tx.to}</p>
          <p>Date: {new Date(tx.timestamp).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
