import { SigningStargateClient } from "@cosmjs/stargate";

export interface WalletState {
    account: string;
    client: SigningStargateClient | null;
    balance: number;
    loading: boolean;
  }
  