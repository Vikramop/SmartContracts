import React, { useEffect, useState } from 'react';
import { TokenBalance, User } from '../types/token';
import { fetchTokenBalance, fetchUserInfo } from '../utils/tokenApi';

const WalletCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch user first to get user.address
    fetchUserInfo()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        return fetchTokenBalance(fetchedUser.address);
      })
      .then((fetchedBalance) => setBalance(fetchedBalance))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading wallet...</div>;
  if (!user) return <div>Please connect your wallet</div>;

  return (
    <div className="p-4 rounded shadow bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold">Wallet</h2>
      <p>Address: {user.address}</p>
      <p>
        Balance:{' '}
        {balance ? `${balance.balance} ${balance.symbol}` : 'Loading...'}
      </p>
    </div>
  );
};

export default WalletCard;
