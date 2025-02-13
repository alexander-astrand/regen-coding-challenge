import { SigningStargateClient } from "@cosmjs/stargate";

export interface WalletState {
    account: string;
    client: SigningStargateClient | undefined;
    balance: number;
    loading: boolean;
  }
  