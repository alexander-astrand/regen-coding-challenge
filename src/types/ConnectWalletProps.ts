import { SigningStargateClient } from '@cosmjs/stargate';

export interface ConnectWalletProps {
  onConnected: (account: string, client: SigningStargateClient, balance: number) => void;
  onDisconnected: () => void;
}
