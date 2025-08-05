import { ethers } from 'ethers';

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const checkSufficientBalance = (requiredAmount: string, userBalance: string): boolean => {
  return parseFloat(userBalance) >= parseFloat(requiredAmount);
};

export const estimateGasWithBuffer = async (
  contract: ethers.Contract, 
  method: string, 
  args: any[],
  bufferPercent: number = 20
): Promise<bigint> => {
  try {
    const gasEstimate = await contract[method].estimateGas(...args);
    return gasEstimate * BigInt(100 + bufferPercent) / 100n;
  } catch (error) {
    console.error('Gas estimation failed:', error);
    return ethers.parseUnits('500000', 'wei'); // Fallback gas limit
  }
};

export const executeWithTimeout = async <T>(
  promise: Promise<T>, 
  timeoutMs: number = 300000
): Promise<T> => {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Transaction timeout')), timeoutMs)
  );
  return Promise.race([promise, timeout]);
};

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

export const parseWeb3Error = (error: any): string => {
  if (error.message.includes('insufficient funds')) {
    return 'Insufficient funds for gas fees';
  } else if (error.message.includes('user rejected')) {
    return 'Transaction rejected by user';
  } else if (error.message.includes('timeout')) {
    return 'Transaction timeout - please try again';
  } else if (error.reason) {
    return error.reason;
  } else if (error.data?.message) {
    return error.data.message;
  }
  return error.message || 'Unknown error occurred';
};