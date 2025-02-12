import { OfflineSigner } from '@cosmjs/proto-signing';
import { ChainInfo } from '@/types/ChainConfig';

declare global {
  interface Window {
    keplr?: {
      experimentalSuggestChain: (chainInfo: ChainInfo) => Promise<void>;
      enable: (chainId: string) => Promise<void>;
    };
    getOfflineSigner?: (chainId: string) => OfflineSigner;
  }
}

export {};
