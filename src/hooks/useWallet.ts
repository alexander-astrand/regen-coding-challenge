import { useState, useCallback } from "react";
import { connectKeplr, getBalance } from "@/utils/keplr";
import { SigningStargateClient } from "@cosmjs/stargate";
import { toast } from "react-toastify";
import { WalletState } from "@/types/WalletState";

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    account: "",
    client: null,
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
      let errorMsg = "An unknown error occurred while connecting the wallet.";
      if (error instanceof Error) {
        errorMsg = `Connection error: ${error.message}`;
      }
      toast.error(
        `${errorMsg} Please ensure your Keplr extension is installed, that you have approved the connection request, and that you are connected to the correct network.`
      );
      setWallet((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      account: "",
      client: null,
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
