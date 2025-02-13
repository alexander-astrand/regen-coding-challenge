export interface ConnectWalletProps {
  account: string;
  balance: number;
  loading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}
