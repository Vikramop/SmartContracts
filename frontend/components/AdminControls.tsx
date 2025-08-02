import React, { useState } from 'react';
import { showToast } from './common/Toast';

interface Props {
  onMint: (to: string, amount: number) => Promise<void>;
}

const AdminControls: React.FC<Props> = ({ onMint }) => {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    try {
      await onMint(to, amount);
      showToast(`Minted ${amount} tokens to ${to}`);
      setTo('');
      setAmount(0);
    } catch (err: any) {
      showToast(err.message || 'Mint failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border ">
      <h3 className="mb-2 font-semibold">Admin Controls</h3>
      <input
        className="border p-1 mr-2 rounded mb-2"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={loading}
      />
      <input
        type="number"
        min={0}
        className="border p-1 mr-2 rounded mb-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={loading}
      />
      <button
        className="bg-blue-600 text-white px-3 rounded"
        onClick={handleMint}
        disabled={loading}
      >
        {loading ? 'Minting...' : 'Mint'}
      </button>
    </div>
  );
};

export default AdminControls;
