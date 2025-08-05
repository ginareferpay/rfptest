import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { NETWORK_CONFIG, CONTRACT_ADDRESSES, CONTRACT_ABI, USDC_ABI, FOUNDER_WALLET } from '@/lib/web3/config';
import { useReferralTracking } from './useReferralTracking';
import { checkSufficientBalance, estimateGasWithBuffer, executeWithTimeout, parseWeb3Error } from '@/utils/web3Utils';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface ContractInfo {
  maxSupply: number;
  totalSupply: number;
  mintPrice: string;
  isPaused: boolean;
  userMints: number;
}

export interface TransactionStatus {
  hash?: string;
  status: 'idle' | 'pending' | 'success' | 'error';
  step: string;
  error?: string;
}

export interface Web3State {
  account: string | null;
  chainId: number | null;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  balance: string;
  nftBalance: number;
  isLoading: boolean;
  error: string | null;
  contractInfo: ContractInfo;
  transactionStatus: TransactionStatus;
  referralCount: number;
}

export const useWeb3 = () => {
  const [state, setState] = useState<Web3State>({
    account: null,
    chainId: null,
    isConnected: false,
    isCorrectNetwork: false,
    balance: '0',
    nftBalance: 0,
    isLoading: false,
    error: null,
    contractInfo: {
      maxSupply: 0,
      totalSupply: 0,
      mintPrice: '0',
      isPaused: false,
      userMints: 0,
    },
    transactionStatus: {
      status: 'idle',
      step: '',
    },
    referralCount: 0,
  });

  const [referrer, setReferrer] = useState<string>(FOUNDER_WALLET);
  const { referralCount, setupReferralListener, resetReferralCount } = useReferralTracking();

  useEffect(() => {
    // Parse referrer from URL
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam && refParam.startsWith('0x') && refParam.length === 42) {
      setReferrer(refParam);
    }
  }, []);

  const checkIfWalletIsConnected = useCallback(async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        if (accounts.length > 0) {
          setState(prev => ({
            ...prev,
            account: accounts[0],
            chainId: parseInt(chainId, 16),
            isConnected: true,
            isCorrectNetwork: parseInt(chainId, 16) === NETWORK_CONFIG.chainId,
          }));
          
          if (parseInt(chainId, 16) === NETWORK_CONFIG.chainId) {
            await updateBalances(accounts[0]);
            setupReferralListener(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
        setState(prev => ({ ...prev, error: 'Failed to check wallet connection' }));
      }
    }
  }, []);

  const updateBalances = async (account: string) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Get USDC balance
        const usdcContract = new ethers.Contract(
          CONTRACT_ADDRESSES.USDC_TOKEN,
          USDC_ABI,
          provider
        );
        
        const usdcBalance = await usdcContract.balanceOf(account);
        const formattedBalance = ethers.formatUnits(usdcBalance, 6);

        // Get NFT balance and contract info
        const nftContract = new ethers.Contract(
          CONTRACT_ADDRESSES.MAIN_CONTRACT,
          CONTRACT_ABI,
          provider
        );
        
        const [nftBalance, maxSupply, totalSupply, mintPrice, isPaused, userMints] = await Promise.all([
          nftContract.balanceOf(account),
          nftContract.MAX_SUPPLY(),
          nftContract.totalSupply(),
          nftContract.MINT_PRICE(),
          nftContract.paused(),
          nftContract.walletMints(account),
        ]);
        
        setState(prev => ({
          ...prev,
          balance: formattedBalance,
          nftBalance: Number(nftBalance),
          referralCount,
          contractInfo: {
            maxSupply: Number(maxSupply),
            totalSupply: Number(totalSupply),
            mintPrice: ethers.formatUnits(mintPrice, 6),
            isPaused: isPaused,
            userMints: Number(userMints),
          },
        }));
      }
    } catch (error) {
      console.error('Error updating balances:', error);
      setState(prev => ({ ...prev, error: 'Failed to update balances' }));
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const numericChainId = parseInt(chainId, 16);

      setState(prev => ({
        ...prev,
        account: accounts[0],
        chainId: numericChainId,
        isConnected: true,
        isCorrectNetwork: numericChainId === NETWORK_CONFIG.chainId,
        isLoading: false,
      }));

      if (numericChainId !== NETWORK_CONFIG.chainId) {
        await switchToPolygon();
      } else {
        await updateBalances(accounts[0]);
        setupReferralListener(accounts[0]);
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to connect wallet',
        isLoading: false,
      }));
    }
  };

  const switchToPolygon = async () => {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}`,
                chainName: NETWORK_CONFIG.chainName,
                nativeCurrency: NETWORK_CONFIG.nativeCurrency,
                rpcUrls: NETWORK_CONFIG.rpcUrls,
                blockExplorerUrls: NETWORK_CONFIG.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Polygon network:', addError);
          setState(prev => ({ ...prev, error: 'Failed to add Polygon network' }));
        }
      } else {
        console.error('Error switching to Polygon:', switchError);
        setState(prev => ({ ...prev, error: 'Failed to switch to Polygon network' }));
      }
    }
  };

  const disconnectWallet = () => {
    setState({
      account: null,
      chainId: null,
      isConnected: false,
      isCorrectNetwork: false,
      balance: '0',
      nftBalance: 0,
      isLoading: false,
      error: null,
      contractInfo: {
        maxSupply: 0,
        totalSupply: 0,
        mintPrice: '0',
        isPaused: false,
        userMints: 0,
      },
      transactionStatus: {
        status: 'idle',
        step: '',
      },
      referralCount: 0,
    });
    setReferrer(FOUNDER_WALLET);
    resetReferralCount();
  };


  const mintNFT = async () => {
    if (!state.isConnected || !state.isCorrectNetwork || !window.ethereum) {
      throw new Error('Wallet not connected or wrong network');
    }

    // Pre-flight checks
    if (state.contractInfo.isPaused) {
      throw new Error('Contract is currently paused');
    }

    if (state.contractInfo.totalSupply >= state.contractInfo.maxSupply) {
      throw new Error('All NFTs have been minted');
    }

    if (!checkSufficientBalance(state.contractInfo.mintPrice, state.balance)) {
      throw new Error(`Insufficient USDC balance. Required: ${state.contractInfo.mintPrice} USDC`);
    }

    try {
      setState(prev => ({ 
        ...prev, 
        isLoading: true, 
        error: null,
        transactionStatus: { status: 'pending', step: 'Preparing transaction...' }
      }));
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Check allowance first
      setState(prev => ({ 
        ...prev, 
        transactionStatus: { status: 'pending', step: 'Checking USDC allowance...' }
      }));
      
      const usdcContract = new ethers.Contract(
        CONTRACT_ADDRESSES.USDC_TOKEN,
        USDC_ABI,
        signer
      );
      
      const requiredAmount = ethers.parseUnits(state.contractInfo.mintPrice, 6);
      const currentAllowance = await usdcContract.allowance(state.account, CONTRACT_ADDRESSES.MAIN_CONTRACT);
      
      // Approve USDC if needed
      if (currentAllowance < requiredAmount) {
        setState(prev => ({ 
          ...prev, 
          transactionStatus: { status: 'pending', step: 'Approving USDC spending...' }
        }));
        
        const gasLimit = await estimateGasWithBuffer(usdcContract, 'approve', [CONTRACT_ADDRESSES.MAIN_CONTRACT, requiredAmount]);
        const approveTx = await usdcContract.approve(CONTRACT_ADDRESSES.MAIN_CONTRACT, requiredAmount, { gasLimit });
        
        setState(prev => ({ 
          ...prev, 
          transactionStatus: { 
            status: 'pending', 
            step: 'Waiting for approval confirmation...', 
            hash: approveTx.hash 
          }
        }));
        
        await executeWithTimeout(approveTx.wait());
      }

      // Mint NFT
      setState(prev => ({ 
        ...prev, 
        transactionStatus: { status: 'pending', step: 'Minting NFT...' }
      }));
      
      const nftContract = new ethers.Contract(
        CONTRACT_ADDRESSES.MAIN_CONTRACT,
        CONTRACT_ABI,
        signer
      );
      
      const gasLimit = await estimateGasWithBuffer(nftContract, 'mint', [referrer]);
      const mintTx = await nftContract.mint(referrer, { gasLimit });
      
      setState(prev => ({ 
        ...prev, 
        transactionStatus: { 
          status: 'pending', 
          step: 'Waiting for mint confirmation...', 
          hash: mintTx.hash 
        }
      }));
      
      await executeWithTimeout(mintTx.wait());
      
      // Update balances after successful mint
      setState(prev => ({ 
        ...prev, 
        transactionStatus: { status: 'success', step: 'NFT minted successfully!', hash: mintTx.hash }
      }));
      
      await updateBalances(state.account!);
      
      setState(prev => ({ ...prev, isLoading: false }));
      
      return mintTx.hash;
    } catch (error: any) {
      console.error('Error minting NFT:', error);
      
      const errorMessage = parseWeb3Error(error);
      
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        transactionStatus: { status: 'error', step: errorMessage, error: errorMessage }
      }));
      throw error;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    let referralCleanup: (() => void) | undefined;

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setState(prev => ({ ...prev, account: accounts[0] }));
          updateBalances(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        const numericChainId = parseInt(chainId, 16);
        setState(prev => ({
          ...prev,
          chainId: numericChainId,
          isCorrectNetwork: numericChainId === NETWORK_CONFIG.chainId,
        }));
        
        if (numericChainId === NETWORK_CONFIG.chainId && state.account) {
          updateBalances(state.account);
          setupReferralListener(state.account).then(cleanup => {
            referralCleanup = cleanup;
          });
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
      if (referralCleanup) {
        referralCleanup();
      }
    };
  }, [checkIfWalletIsConnected, state.account]);

  return {
    ...state,
    referrer,
    referralCount,
    connectWallet,
    disconnectWallet,
    switchToPolygon,
    mintNFT,
  };
};