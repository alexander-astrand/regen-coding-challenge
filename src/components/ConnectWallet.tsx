'use client';

import { ConnectWalletProps } from "@/types/ConnectWalletProps";

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  account,
  balance,
  loading,
  connect,
  disconnect,
}) => {
  // If no wallet is connected, a minimal Connect button is shown
  if (!account) {
    return (
      <div className="flex items-center justify-center py-4">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2" />
            <span>Connecting...</span>
          </div>
        ) : (
          <button
            onClick={connect}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            Connect Wallet
          </button>
        )}
      </div>
    );
  }

  // When wallet is connected, full panel with wallet info is shown
  return (
    <div className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800 flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-4">Your Wallet</h2>
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-2" />
          <span>Connecting...</span>
        </div>
      ) : (
        <>
          <p className="mb-1 break-all">
            <strong>Address:</strong> {account}
          </p>
          <p className="mb-5">
            <strong>Balance:</strong> {balance} REGEN
          </p>
          <button
            onClick={disconnect}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow"
          >
            Disconnect Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
