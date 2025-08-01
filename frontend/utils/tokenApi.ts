import { TokenBalance, Transaction, User } from '../types/token';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/token';

export async function fetchTokenBalance(
  address: string
): Promise<TokenBalance> {
  const res = await fetch(`${API_URL}/balance?address=${address}`);
  if (!res.ok) throw new Error('Failed to fetch balance');
  return res.json();
}

export async function fetchTransactions(
  address: string
): Promise<Transaction[]> {
  const res = await fetch(`${API_URL}/transactions?address=${address}`);
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function fetchUserInfo(): Promise<User> {
  // You can pass the token or address if needed
  const res = await fetch(`${API_URL}/userinfo`);
  if (!res.ok) throw new Error('Failed to fetch user info');
  return res.json();
}

export async function mintTokens(
  to: string,
  amount: number,
  jwt?: string
): Promise<{ success: boolean }> {
  const res = await fetch(`${API_URL}/mint`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(jwt ? { Authorization: `Bearer ${jwt}` } : {}),
    },
    body: JSON.stringify({ to, amount }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
