"use client";

import { useEffect } from "react";
import ConnectWallet from "@/components/ConnectWallet";
import SendTokens from "@/components/SendTokens";
import ThemeToggleSwitch from "@/components/ThemeToggle";
import { useWallet } from "@/hooks/useWallet";

export default function HomePage() {
  const {
    account,
    client,
    balance,
    loading,
    connect,
    disconnect,
    updateBalance,
  } = useWallet();

  // Listenening for changes in the Keplr wallet (e.g. when the user switches accounts)
  useEffect(() => {
    const handleKeplrChange = async () => {
      await connect();
    };

    window.addEventListener("keplr_keystorechange", handleKeplrChange);
    return () => {
      window.removeEventListener("keplr_keystorechange", handleKeplrChange);
    };
  }, [connect]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Global Theme Toggle */}
      <ThemeToggleSwitch />
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">
          Redwood Testnet Wallet
        </h1>
        <ConnectWallet
          account={account}
          balance={balance}
          loading={loading}
          connect={connect}
          disconnect={disconnect}
        />
        {account && client && (
          <SendTokens
            senderAddress={account}
            client={client}
            onBalanceUpdated={updateBalance}
          />
        )}
      </div>
    </div>
  );
}
