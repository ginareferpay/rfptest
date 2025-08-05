import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/lib/web3/config';

export const useReferralTracking = () => {
  const [referralCount, setReferralCount] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const setupReferralListener = useCallback(async (account: string) => {
    if (!window.ethereum || isTracking) return;

    try {
      setIsTracking(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get USDC contract with Transfer event ABI
      const usdcContract = new ethers.Contract(
        CONTRACT_ADDRESSES.USDC_TOKEN,
        [
          {
            "anonymous": false,
            "inputs": [
              {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
              {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
              {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
            ],
            "name": "Transfer",
            "type": "event"
          }
        ],
        provider
      );

      // Create filter for Transfer events where from = ReferPay contract and to = user
      const filter = usdcContract.filters.Transfer(CONTRACT_ADDRESSES.MAIN_CONTRACT, account);
      
      // Count historical referrals with retry mechanism
      let fromBlock: number;
      let existingEvents: any[] = [];
      
      try {
        const currentBlock = await provider.getBlockNumber();
        fromBlock = Math.max(0, currentBlock - 100000); // Look back further for complete history
        existingEvents = await usdcContract.queryFilter(filter, fromBlock, currentBlock);
      } catch (error) {
        console.warn('Failed to fetch historical events, trying smaller range:', error);
        try {
          const currentBlock = await provider.getBlockNumber();
          fromBlock = Math.max(0, currentBlock - 10000); // Fallback to smaller range
          existingEvents = await usdcContract.queryFilter(filter, fromBlock, currentBlock);
        } catch (fallbackError) {
          console.error('Failed to fetch historical events:', fallbackError);
          existingEvents = [];
        }
      }
      
      setReferralCount(existingEvents.length);
      
      // Listen for new Transfer events
      const handleTransfer = (from: string, to: string, value: bigint) => {
        if (from === CONTRACT_ADDRESSES.MAIN_CONTRACT && to === account) {
          setReferralCount(prev => prev + 1);
        }
      };
      
      usdcContract.on(filter, handleTransfer);
      
      // Return cleanup function
      return () => {
        usdcContract.off(filter, handleTransfer);
        setIsTracking(false);
      };
      
    } catch (error) {
      console.error('Error setting up referral listener:', error);
      setIsTracking(false);
      throw new Error('Failed to setup referral tracking');
    }
  }, [isTracking]);

  const resetReferralCount = useCallback(() => {
    setReferralCount(0);
    setIsTracking(false);
  }, []);

  return {
    referralCount,
    setupReferralListener,
    resetReferralCount,
    isTracking,
  };
};