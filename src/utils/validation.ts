import { bech32 } from 'bech32';

export const validateRegenAddress = (address: string): boolean => {
  try {
    const decoded = bech32.decode(address);
    // Check that the prefix is 'regen'
    return decoded.prefix === 'regen';
  } catch {
    return false;
  }
};
