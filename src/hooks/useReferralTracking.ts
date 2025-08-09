import { useState, useCallback, useRef } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '@/lib/web3/config';

export const useReferralTracking = () => {
  const [referralCount, setReferralCount] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const lastAccountRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingIncrementsRef = useRef<number>(0);
  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

  const setupReferralListener = useCallback(async (account: string) => {
    if (!window.ethereum) return cleanupRef.current || undefined;

    const acct = account?.toLowerCase();

    if (isTracking) {
      if (lastAccountRef.current === acct) {
        return cleanupRef.current || undefined;
      } else if (cleanupRef.current) {
        // Switch listening to a new account
        cleanupRef.current();
      }
    }

    try {
      setIsTracking(true);
      lastAccountRef.current = acct;
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

      // Create filter for Transfer events where from = ReferPay contract and to = user (normalized)
      console.log('🔧 Creating filter with:', {
        mainContract: CONTRACT_ADDRESSES.MAIN_CONTRACT,
        user: acct,
        usdcToken: CONTRACT_ADDRESSES.USDC_TOKEN
      });
      const filter = usdcContract.filters.Transfer(CONTRACT_ADDRESSES.MAIN_CONTRACT, acct);
      
      // Use cached count for faster initial UI
      const cacheKey = `rp_ref_count_${acct}`;
      try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed.value === 'number' && Date.now() - parsed.ts < CACHE_TTL_MS) {
            setReferralCount(parsed.value);
          }
        }
      } catch {}
      
      // Count historical referrals with retry mechanism
      let fromBlock: number;
      let existingEvents: any[] = [];
      
      try {
        const currentBlock = await provider.getBlockNumber();
        fromBlock = Math.max(0, currentBlock - 100000); // Look back further for complete history
        console.log('🔍 Searching for referrals:', {
          user: acct,
          contract: CONTRACT_ADDRESSES.MAIN_CONTRACT,
          fromBlock,
          currentBlock,
          usdcContractAddress: CONTRACT_ADDRESSES.USDC_TOKEN
        });
        
        // أيضا دعنا نتحقق من جميع أحداث Transfer إلى المستخدم (بدون فلتر العقد)
        const allTransfersFilter = usdcContract.filters.Transfer(null, acct);
        const allTransfers = await usdcContract.queryFilter(allTransfersFilter, fromBlock, currentBlock);
        console.log('📈 All USDC transfers to user:', allTransfers.length, allTransfers);
        
        existingEvents = await usdcContract.queryFilter(filter, fromBlock, currentBlock);
        console.log('📊 Found historical events:', existingEvents.length, existingEvents);
      } catch (error) {
        console.warn('Failed to fetch 100k range, trying 10k:', error);
        try {
          const currentBlock = await provider.getBlockNumber();
          fromBlock = Math.max(0, currentBlock - 10000); // Fallback to smaller range
          existingEvents = await usdcContract.queryFilter(filter, fromBlock, currentBlock);
        } catch (fallbackError) {
          console.warn('Failed to fetch 10k range, trying 2k stepped scan:', fallbackError);
          try {
            const currentBlock = await provider.getBlockNumber();
            const step = 2000;
            existingEvents = [];
            for (let start = Math.max(0, currentBlock - 20000); start <= currentBlock; start += step) {
              const end = Math.min(currentBlock, start + step);
              const chunk = await usdcContract.queryFilter(filter, start, end);
              if (chunk.length) existingEvents.push(...chunk);
            }
          } catch (finalErr) {
            console.error('Failed to fetch historical events:', finalErr);
            existingEvents = [];
          }
        }
      }
      
      console.log('✅ Setting referral count to:', existingEvents.length);
      setReferralCount(existingEvents.length);
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ value: existingEvents.length, ts: Date.now() }));
      } catch {}
      
      // Listen for new Transfer events
      const handleTransfer = (from: string, to: string, value: bigint) => {
        console.log('🎯 Transfer event received:', { from, to, value: value.toString(), acct });
        if (from?.toLowerCase() === CONTRACT_ADDRESSES.MAIN_CONTRACT.toLowerCase() && to?.toLowerCase() === acct) {
          console.log('✅ Transfer matches user - incrementing count');
          pendingIncrementsRef.current += 1;
          if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = setTimeout(() => {
            const inc = pendingIncrementsRef.current;
            pendingIncrementsRef.current = 0;
            setReferralCount(prev => {
              const next = prev + inc;
              try {
                localStorage.setItem(cacheKey, JSON.stringify({ value: next, ts: Date.now() }));
              } catch {}
              return next;
            });
          }, 500);
        }
      };
      
      usdcContract.on(filter, handleTransfer);
      
      // Store and return cleanup function
      const cleanup = () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        usdcContract.off(filter, handleTransfer);
        cleanupRef.current = null;
        lastAccountRef.current = null;
        setIsTracking(false);
      };
      cleanupRef.current = cleanup;
      return cleanup;
      
    } catch (error) {
      console.error('Error setting up referral listener:', error);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      cleanupRef.current = null;
      lastAccountRef.current = null;
      setIsTracking(false);
      throw new Error('Failed to setup referral tracking');
    }
  }, [isTracking]);

  const resetReferralCount = useCallback(() => {
    try {
      cleanupRef.current?.();
    } catch {}
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