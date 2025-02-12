import { SigningStargateClient } from '@cosmjs/stargate';

export interface SendTokensProps {
  senderAddress: string;
  client: SigningStargateClient;
  onBalanceUpdated: (newBalance: number) => void;
}
