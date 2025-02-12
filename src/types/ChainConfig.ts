export interface ChainInfo {
    chainId: string;
    chainName: string;
    rpc: string;
    rest: string;
    stakeCurrency: {
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
    };
    bip44: { coinType: number };
    bech32Config: {
      bech32PrefixAccAddr: string;
      bech32PrefixAccPub: string;
      bech32PrefixValAddr: string;
      bech32PrefixValPub: string;
      bech32PrefixConsAddr: string;
      bech32PrefixConsPub: string;
    };
    currencies: Array<{
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
    }>;
    feeCurrencies: Array<{
      coinDenom: string;
      coinMinimalDenom: string;
      coinDecimals: number;
      gasPriceStep: {
        low: number;
        average: number;
        high: number;
      };
    }>;
    features: string[];
  }
  