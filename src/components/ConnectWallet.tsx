'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { connectKeplr, getBalance } from '@/utils/keplr';
import { ConnectWalletProps } from '@/types/ConnectWalletProps';
import { SigningStargateClient } from '@cosmjs/stargate';
import { toast } from 'react-toastify';

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnected, onDisconnected }) => {
  const [account, setAccount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const connect = useCallback(async () => {
    setLoading(true);
    try {
      const { account, client } = await connectKeplr();
      setAccount(account);
      const currentBalance = await getBalance(client, account);
      onConnected(account, client as SigningStargateClient, currentBalance);
      toast.success('Wallet connected successfully!');
    } catch (error: unknown) {
      console.error('Error connecting wallet:', error);
      if (error instanceof Error) {
        toast.error(`Connection error: ${error.message}`);
      } else {
        toast.error('An unknown error occurred while connecting wallet.');
      }
    }
    setLoading(false);
  }, [onConnected]);

  useEffect(() => {
    // Auto-connect on mount
    connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const disconnect = () => {
    setAccount('');
    onDisconnected();
    toast.info('Wallet disconnected.');
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4">Your Wallet</h2>
      {loading ? (
        <p>Connecting...</p>
      ) : account ? (
        <>
          <p className="mb-2">
            <strong>Wallet:</strong> {account}
          </p>
          <button
            onClick={disconnect}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button
          onClick={connect}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
