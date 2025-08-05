import { useState, useCallback } from 'react';
import { TransactionStatus } from '@/hooks/useWeb3';

export const useTransaction = () => {
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>({
    status: 'idle',
    step: '',
  });

  const updateTransactionStatus = useCallback((status: TransactionStatus) => {
    setTransactionStatus(status);
  }, []);

  const resetTransactionStatus = useCallback(() => {
    setTransactionStatus({
      status: 'idle',
      step: '',
    });
  }, []);

  const setTransactionPending = useCallback((step: string) => {
    setTransactionStatus({
      status: 'pending',
      step,
    });
  }, []);

  const setTransactionSuccess = useCallback((step: string, hash?: string) => {
    setTransactionStatus({
      status: 'success',
      step,
      hash,
    });
  }, []);

  const setTransactionError = useCallback((error: string) => {
    setTransactionStatus({
      status: 'error',
      step: error,
      error,
    });
  }, []);

  return {
    transactionStatus,
    updateTransactionStatus,
    resetTransactionStatus,
    setTransactionPending,
    setTransactionSuccess,
    setTransactionError,
  };
};