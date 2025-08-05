import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  Users, 
  DollarSign, 
  Shield, 
  Zap,
  Globe,
  Target,
  TrendingUp
} from 'lucide-react';

interface PublicViewProps {
  onConnectWallet: () => void;
  isLoading: boolean;
}

export const PublicView = ({ onConnectWallet, isLoading }: PublicViewProps) => {
  return (
    <div className="min-h-screen circuit-bg">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-glow">
              <span className="text-foreground">The Future of</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-electric bg-clip-text text-transparent">
                Decentralized Funding
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Join the first community-powered launchpad built on Web3 principles. 
              Fund innovation, earn rewards, and shape the future of digital payments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={onConnectWallet}
                disabled={isLoading}
                size="lg"
                className="btn-gradient text-primary-foreground font-bold px-8 py-4 text-lg group"
              >
                {isLoading ? 'Connecting...' : 'Get Your Founding Deed'}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-electric text-electric hover:bg-electric hover:text-background"
                asChild
              >
                <a href="/whitepaper">Read Whitepaper</a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100K</div>
                <div className="text-sm text-muted-foreground">Target Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-electric">$5</div>
                <div className="text-sm text-muted-foreground">Entry Price (USDC)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$1</div>
                <div className="text-sm text-muted-foreground">Referral Reward</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              How ReferPay Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent model that rewards early supporters and builds sustainable funding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="card-glow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Contribute $5 USDC</h3>
                <p className="text-muted-foreground">
                  Make a small contribution to fund the development of innovative payment solutions
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-electric to-electric-glow flex items-center justify-center">
                  <Shield className="w-8 h-8 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Receive NFT Deed</h3>
                <p className="text-muted-foreground">
                  Get your unique Founding Deed NFT with profit-sharing royalties and exclusive access
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                  <Users className="w-8 h-8 text-success-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Earn & Refer</h3>
                <p className="text-muted-foreground">
                  Earn $1 USDC for each successful referral and participate in profit sharing
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              Why Choose ReferPay?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the decentralized future with transparency, security, and community at its core
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Decentralized</h3>
              <p className="text-muted-foreground text-sm">
                Built on Polygon blockchain for transparency and security
              </p>
            </div>

            <div className="text-center p-6">
              <Target className="w-12 h-12 mx-auto mb-4 text-electric" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Community-Driven</h3>
              <p className="text-muted-foreground text-sm">
                Governed by the community of Founding Deed holders
              </p>
            </div>

            <div className="text-center p-6">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-success" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Profit Sharing</h3>
              <p className="text-muted-foreground text-sm">
                Founding Deed holders receive ongoing royalties from platform revenue
              </p>
            </div>

            <div className="text-center p-6">
              <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Innovation First</h3>
              <p className="text-muted-foreground text-sm">
                Funding cutting-edge payment solutions and Web3 infrastructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="community" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-foreground">
              Be Part of the Revolution
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join 100,000 forward-thinking individuals who are building the future of decentralized payments. 
              Your contribution today shapes tomorrow's financial infrastructure.
            </p>
            
            <Button
              onClick={onConnectWallet}
              disabled={isLoading}
              size="lg"
              className="btn-gradient text-primary-foreground font-bold px-12 py-4 text-lg group animate-pulse-slow"
            >
              {isLoading ? 'Connecting...' : 'Secure Your Founding Deed Now'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="mt-6 text-sm text-muted-foreground">
              Limited to 100,000 Founding Deeds • Built on Polygon • Secured by Smart Contracts
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};