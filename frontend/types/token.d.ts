export interface TokenBalance {
  balance: number;
  symbol: string;
}

export interface Transaction {
  id: string;
  to: string;
  from: string;
  amount: number;
  timestamp: string;
  type: 'mint' | 'burn' | 'transfer';
}

export interface User {
  address: string;
  roles: string[];
}
