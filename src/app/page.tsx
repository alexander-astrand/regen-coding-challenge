'use client';

import React, { useState } from 'react';
import ConnectWallet from '@/components/ConnectWallet';
import SendTokens from '@/components/SendTokens';
import ThemeToggle from '@/components/ThemeToggle';
import { SigningStargateClient } from '@cosmjs/stargate';

export default function HomePage() {
  const [wallet, setWallet] = useState<{ account: string; client: SigningStargateClient | null }>({
    account: '',
    client: null,
  });
  const [balance, setBalance] = useState<number>(0);

  const handleWalletConnected = (
    account: string,
    client: SigningStargateClient,
    balance: number
  ) => {
    setWallet({ account, client });
    setBalance(balance);
  };

  const handleWalletDisconnected = () => {
    setWallet({ account: '', client: null });
    setBalance(0);
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center py-10">
      <div className="max-w-2xl w-full px-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-center mb-8">
          Regen Redwood Testnet Wallet
        </h1>
        <ConnectWallet
          onConnected={handleWalletConnected}
          onDisconnected={handleWalletDisconnected}
        />
        {wallet.account && wallet.client && (
          <SendTokens senderAddress={wallet.account} client={wallet.client} onBalanceUpdated={updateBalance} />
        )}
        {wallet.account && (
          <div className="mt-6 text-center">
            <p className="text-xl">
              <span className="font-semibold">Current Balance:</span> {balance} REGEN
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
