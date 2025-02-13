// src/hooks/useWallet.ts
import { useState, useCallback } from "react";
import { connectKeplr, getBalance } from "@/utils/keplr";
import { SigningStargateClient } from "@cosmjs/stargate";
import { toast } from "react-toastify";
import { WalletState } from "@/types/WalletState";

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    account: "",
    client: undefined,
    balance: 0,
    loading: false,
  });

  const connect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, loading: true }));
    try {
      const { account, client } = await connectKeplr();
      const currentBalance = await getBalance(client, account);
      setWallet({
        account,
        client: client as SigningStargateClient,
        balance: currentBalance,
        loading: false,
      });
      toast.success("Wallet connected successfully!");
    } catch (error: unknown) {
      console.error("Error connecting wallet:", error);
      if (error instanceof Error) {
        toast.error(`Connection error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred while connecting wallet.");
      }
      setWallet((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      account: "",
      client: undefined,
      balance: 0,
      loading: false,
    });
    toast.info("Wallet disconnected.");
  }, []);

  const updateBalance = useCallback(async () => {
    if (wallet.client && wallet.account) {
      const newBalance = await getBalance(wallet.client, wallet.account);
      setWallet((prev) => ({ ...prev, balance: newBalance }));
    }
  }, [wallet.client, wallet.account]);

  return {
    ...wallet,
    connect,
    disconnect,
    updateBalance,
  };
};
