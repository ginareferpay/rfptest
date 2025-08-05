import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ContractInfo } from "@/hooks/useWeb3";

interface ContractStatsProps {
  contractInfo: ContractInfo;
}

export const ContractStats = ({ contractInfo }: ContractStatsProps) => {
  const mintProgress = (contractInfo.totalSupply / contractInfo.maxSupply) * 100;
  const remaining = contractInfo.maxSupply - contractInfo.totalSupply;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Minted</CardTitle>
          <Badge variant="secondary">{contractInfo.totalSupply}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contractInfo.totalSupply.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            of {contractInfo.maxSupply.toLocaleString()} NFTs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          <Badge variant="outline">{remaining}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{remaining.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            NFTs available
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mint Price</CardTitle>
          <Badge variant="secondary">USDC</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${contractInfo.mintPrice}</div>
          <p className="text-xs text-muted-foreground">
            per NFT
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Your Mints</CardTitle>
          <Badge variant={contractInfo.userMints > 0 ? "default" : "outline"}>
            {contractInfo.userMints}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{contractInfo.userMints}</div>
          <p className="text-xs text-muted-foreground">
            NFTs owned
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Mint Progress</CardTitle>
          <CardDescription>
            {contractInfo.totalSupply.toLocaleString()} / {contractInfo.maxSupply.toLocaleString()} NFTs minted
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={mintProgress} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{mintProgress.toFixed(1)}% Complete</span>
            <span>{remaining.toLocaleString()} Remaining</span>
          </div>
        </CardContent>
      </Card>

      {contractInfo.isPaused && (
        <Card className="col-span-full border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-orange-200 text-orange-800">
                Paused
              </Badge>
              <span className="text-sm text-orange-800">
                Contract is currently paused. Minting is temporarily unavailable.
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};