import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Copy, 
  ExternalLink, 
  Wallet, 
  Users, 
  DollarSign, 
  Gift,
  Bot,
  Target,
  Award,
  TrendingUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ContractStats } from './ContractStats';
import { TransactionStatus } from './TransactionStatus';
import { ContractInfo, TransactionStatus as TransactionStatusType } from '@/hooks/useWeb3';

interface DashboardViewProps {
  account: string;
  balance: string;
  nftBalance: number;
  referrer: string;
  contractInfo: ContractInfo;
  transactionStatus: TransactionStatusType;
  onMintNFT: () => void;
  isLoading: boolean;
  onDismissTransaction?: () => void;
}

export const DashboardView = ({ 
  account, 
  balance, 
  nftBalance, 
  referrer,
  contractInfo,
  transactionStatus,
  onMintNFT, 
  isLoading,
  onDismissTransaction
}: DashboardViewProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const referralLink = `${window.location.origin}?ref=${account}`;

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: message,
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 circuit-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your Founding Deed, track referrals, and access exclusive tools
          </p>
        </div>

        {/* Transaction Status */}
        <TransactionStatus 
          transactionStatus={transactionStatus} 
          onDismiss={onDismissTransaction}
        />

        {/* Contract Statistics */}
        <div className="mb-8">
          <ContractStats contractInfo={contractInfo} />
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                Wallet Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{formatAddress(account)}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(account, "Wallet address copied to clipboard")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                USDC Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{balance}</div>
              <p className="text-sm text-muted-foreground">Available for minting</p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Founding Deeds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{nftBalance}</div>
              <p className="text-sm text-muted-foreground">NFTs owned</p>
            </CardContent>
          </Card>

          <Card className="card-glow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-electric">0</div>
              <p className="text-sm text-muted-foreground">Total referred</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="nft">Your NFT</TabsTrigger>
            <TabsTrigger value="bounty">Bounty Board</TabsTrigger>
            <TabsTrigger value="ai-toolkit">AI Toolkit</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Referral Card */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-primary" />
                    Your Referral Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg border">
                    <p className="text-sm font-mono break-all">{referralLink}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => copyToClipboard(referralLink, "Referral link copied to clipboard")}
                      className="flex-1"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=Join me on ReferPay.org - The future of decentralized funding! ${referralLink}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Earn $1 USDC for each person who mints using your link
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="card-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-electric" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {nftBalance === 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        You don't have a Founding Deed yet. Mint one to unlock all dashboard features.
                      </p>
                      <Button
                        onClick={onMintNFT}
                        disabled={
                          isLoading || 
                          contractInfo.isPaused || 
                          contractInfo.totalSupply >= contractInfo.maxSupply ||
                          parseFloat(balance) < parseFloat(contractInfo.mintPrice)
                        }
                        className="w-full btn-gradient text-primary-foreground"
                      >
                        {isLoading ? transactionStatus.step || 'Processing...' : 
                         contractInfo.isPaused ? 'Contract Paused' :
                         contractInfo.totalSupply >= contractInfo.maxSupply ? 'Sold Out' :
                         'Mint Your Founding Deed'}
                      </Button>
                      {contractInfo.isPaused && (
                        <p className="text-sm text-orange-600">
                          Minting is temporarily paused.
                        </p>
                      )}
                      {contractInfo.totalSupply >= contractInfo.maxSupply && (
                        <p className="text-sm text-destructive">
                          All NFTs have been minted.
                        </p>
                      )}
                      {parseFloat(balance) < parseFloat(contractInfo.mintPrice) && !contractInfo.isPaused && (
                        <p className="text-sm text-destructive">
                          Insufficient USDC balance. You need {contractInfo.mintPrice} USDC to mint.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Badge variant="secondary" className="w-full justify-center py-2">
                        <Award className="w-4 h-4 mr-2" />
                        Founding Member
                      </Badge>
                      <p className="text-sm text-muted-foreground text-center">
                        You have access to all platform features and profit-sharing royalties.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Stats Overview */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-success" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">$0</div>
                    <div className="text-sm text-muted-foreground">Referral Earnings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-electric">0%</div>
                    <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">$0</div>
                    <div className="text-sm text-muted-foreground">Total Royalties</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{nftBalance}</div>
                    <div className="text-sm text-muted-foreground">NFTs Owned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Tab */}
          <TabsContent value="nft">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Your Founding Deed NFT</CardTitle>
              </CardHeader>
              <CardContent>
                {nftBalance > 0 ? (
                  <div className="text-center space-y-4">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary to-electric rounded-lg flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/d00319b6-4f37-439a-a840-be9d8a55ff9a.png" 
                        alt="ReferPay Founding Deed" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">Founding Deed #{nftBalance}</h3>
                      <p className="text-muted-foreground">One of 100,000 Founding Deeds</p>
                      <Badge className="mt-2">Profit-Sharing Enabled</Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-muted-foreground">No NFT Yet</div>
                    </div>
                    <p className="text-muted-foreground">Mint your Founding Deed to see it here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bounty Board Tab */}
          <TabsContent value="bounty">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Bounty Board</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    The Bounty Board will feature community-driven tasks and rewards. 
                    Stay tuned for exciting opportunities to earn by contributing to the ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Toolkit Tab */}
          <TabsContent value="ai-toolkit">
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  AI Toolkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bot className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">AI Tools Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Access powerful AI tools for marketing, content creation, and business development. 
                    Exclusive to Founding Deed holders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};