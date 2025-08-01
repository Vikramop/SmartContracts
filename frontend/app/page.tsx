'use client';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import WalletCard from '../components/WalletCard';
import TransactionList from '../components/TransactionList';
import AdminControls from '../components/AdminControls';
import { TokenBalance, Transaction, User } from '../types/token';
import {
  fetchUserInfo,
  fetchTokenBalance,
  fetchTransactions,
  mintTokens,
} from '../utils/tokenApi';
import { showToast } from '../components/common/Toast';

const Home: NextPage = () => {
  // State variables for user info, balance, transactions, loading and error
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user info, balance, and transactions from the backend on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const fetchedUser = await fetchUserInfo();
        setUser(fetchedUser);

        // Fetch balance & transactions in parallel
        const [fetchedBalance, fetchedTransactions] = await Promise.all([
          fetchTokenBalance(fetchedUser.address),
          fetchTransactions(fetchedUser.address),
        ]);
        setBalance(fetchedBalance);
        setTransactions(fetchedTransactions);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch data from backend');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Mint handler calls your backend mint API and shows toast notifications
  const handleMint = async (to: string, amount: number) => {
    try {
      // You can pass JWT or auth token here if needed
      await mintTokens(to, amount);

      showToast(`Minted ${amount} tokens to ${to}`);

      // Refresh balance and transactions after minting
      if (user) {
        const [updatedBalance, updatedTransactions] = await Promise.all([
          fetchTokenBalance(user.address),
          fetchTransactions(user.address),
        ]);
        setBalance(updatedBalance);
        setTransactions(updatedTransactions);
      }
    } catch (e: any) {
      showToast(e.message || 'Mint failed', 'error');
    }
  };

  if (loading) return <div className="p-4 text-center">Loading data...</div>;

  if (error)
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;

  if (!user)
    return (
      <div className="p-4 text-center">
        No user data available. Please connect your wallet.
      </div>
    );

  return (
    <div className="container mx-auto p-4 max-w-4xl space-y-6">
      <WalletCard user={user} balance={balance} />
      <TransactionList transactions={transactions} />
      {user.roles.includes('admin') && <AdminControls onMint={handleMint} />}
    </div>
  );
};

export default Home;
