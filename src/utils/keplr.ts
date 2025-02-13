import { SigningStargateClient } from '@cosmjs/stargate';
import { chainInfo } from '../../chainConfig';
import { ChainInfo } from "@keplr-wallet/types"


export const connectKeplr = async () => {
  if (!window.keplr) {
    throw new Error('Keplr extension not found');
  }
  await window.keplr.experimentalSuggestChain(chainInfo as ChainInfo);
  await window.keplr.enable(chainInfo.chainId);

  if (!window.getOfflineSigner) {
    throw new Error('getOfflineSigner not found');
  }
  const offlineSigner = window.getOfflineSigner(chainInfo.chainId);
  const accounts = await offlineSigner.getAccounts();
  const client = await SigningStargateClient.connectWithSigner(
    chainInfo.rpc,
    offlineSigner
  );
  return { account: accounts[0].address, client };
};

export const getBalance = async (client: SigningStargateClient, address: string) => {
  const result = await client.getBalance(
    address,
    chainInfo.stakeCurrency.coinMinimalDenom
  );
  return parseFloat(result.amount) / 1e6; // Converts from uregen to REGEN
};

export const sendTokens = async (
  client: SigningStargateClient,
  senderAddress: string,
  recipientAddress: string,
  amount: number
) => {
  const amountInUregen = (amount * 1e6).toString();
  const fee = {
    amount: [
      {
        denom: chainInfo.stakeCurrency.coinMinimalDenom,
        amount: '5000',
      },
    ],
    gas: '200000',
  };

  const result = await client.sendTokens(
    senderAddress,
    recipientAddress,
    [
      {
        denom: chainInfo.stakeCurrency.coinMinimalDenom,
        amount: amountInUregen,
      },
    ],
    fee
  );

  return result;
};

