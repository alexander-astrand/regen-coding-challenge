'use client';

import React, { useState } from 'react';
import Modal from '@/components/Modal';
import { sendTokens, getBalance } from '@/utils/keplr';
import { SendTokensProps } from '@/types/SendTokensProps';
import { SigningStargateClient } from '@cosmjs/stargate';
import { validateRegenAddress } from '@/utils/validation';
import { toast } from 'react-toastify';

const SendTokens: React.FC<SendTokensProps> = ({ senderAddress, client, onBalanceUpdated }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegenAddress(recipient)) {
      toast.error('Invalid address. Please ensure it starts with "regen" and is correctly formatted.');
      return;
    }

    setLoading(true);
    try {
      const txResult = await sendTokens(
        client as SigningStargateClient,
        senderAddress,
        recipient,
        parseFloat(amount)
      );
      if (txResult.code === 0) {
        toast.success('Transaction successful!');
        const newBalance = await getBalance(client as SigningStargateClient, senderAddress);
        onBalanceUpdated(newBalance);
        setIsModalOpen(false);
      } else {
        toast.error(`Transaction failed: ${txResult.rawLog}`);
      }
    } catch (error: unknown) {
      console.error('Transaction error:', error);
      if (error instanceof Error) {
        toast.error(`Transaction error: ${error.message}`);
      } else {
        toast.error('Transaction error occurred');
      }
    }
    setLoading(false);
  };

  return (
    <div className="mt-8">
      <button 
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow"
        onClick={() => setIsModalOpen(true)}
      >
        Send REGEN Tokens
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Send REGEN Tokens</h2>
        <form onSubmit={handleSend}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Recipient Address:
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Amount (REGEN):
            </label>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring focus:border-blue-300 text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded focus:outline-none focus:ring"
          >
            {loading ? 'Sending...' : 'Send Tokens'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SendTokens;
