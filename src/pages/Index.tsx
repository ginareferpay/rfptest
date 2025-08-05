import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PublicView } from '@/components/PublicView';
import { DashboardView } from '@/components/DashboardView';
import { useWeb3 } from '@/hooks/useWeb3';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { 
    account, 
    balance, 
    nftBalance, 
    isConnected, 
    isCorrectNetwork, 
    isLoading, 
    error, 
    referrer,
    contractInfo,
    transactionStatus,
    connectWallet, 
    disconnectWallet, 
    switchToPolygon, 
    mintNFT 
  } = useWeb3();
  
  const { toast } = useToast();
  const [isMinting, setIsMinting] = useState(false);

  const handleDismissTransaction = () => {
    // Reset transaction status to idle
    // This would be handled in the useWeb3 hook
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleMintNFT = async () => {
    try {
      setIsMinting(true);
      const txHash = await mintNFT();
      toast({
        title: "Success!",
        description: `NFT minted successfully! Transaction: ${txHash}`,
      });
    } catch (error: any) {
      toast({
        title: "Minting Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  // Show error messages
  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Check if user should see dashboard
  const showDashboard = isConnected && isCorrectNetwork;

  return (
    <div className="min-h-screen">
      <Header 
        onConnectWallet={handleConnectWallet}
        onDisconnectWallet={disconnectWallet}
        isConnected={isConnected}
        account={account}
        showDashboardNav={showDashboard}
      />
      
      {showDashboard ? (
        <DashboardView
          account={account!}
          balance={balance}
          nftBalance={nftBalance}
          referrer={referrer}
          contractInfo={contractInfo}
          transactionStatus={transactionStatus}
          onMintNFT={handleMintNFT}
          isLoading={isMinting || isLoading}
          onDismissTransaction={handleDismissTransaction}
        />
      ) : (
        <PublicView
          onConnectWallet={handleConnectWallet}
          isLoading={isLoading}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
