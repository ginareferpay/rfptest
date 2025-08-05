import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';

export const Whitepaper = () => {
  const { connectWallet, disconnectWallet, isConnected, account } = useWeb3();

  return (
    <div className="min-h-screen circuit-bg">
      <Header 
        onConnectWallet={connectWallet}
        onDisconnectWallet={disconnectWallet}
        isConnected={isConnected}
        account={account}
      />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-glow">
              ReferPay Whitepaper
            </h1>
            <p className="text-xl text-muted-foreground">
              Building the Future of Decentralized Payment Infrastructure
            </p>
          </div>

          <div className="space-y-8">
            {/* Executive Summary */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Executive Summary</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org represents a paradigm shift in how digital payment infrastructure is funded, developed, and governed. 
                  As the first decentralized digital entity, we are pioneering a community-driven approach to building the next 
                  generation of Web3 payment solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our genesis project utilizes the innovative "100,000 Model" - a sustainable funding mechanism that enables 
                  100,000 community partners to collectively fund the development of "RePay," our flagship developer-friendly 
                  payment gateway API, while sharing in its future profits through blockchain-based profit-sharing royalties.
                </p>
              </CardContent>
            </Card>

            {/* The Vision */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">The Vision</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Traditional payment systems are centralized, expensive, and exclude billions of people worldwide. 
                  ReferPay.org envisions a future where:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Payment infrastructure is owned and governed by its users</li>
                  <li>Developers have access to simple, powerful APIs for Web3 payments</li>
                  <li>Transaction fees are minimized through efficient blockchain technology</li>
                  <li>Global financial inclusion is achieved through decentralized access</li>
                  <li>Innovation is driven by community funding and collaboration</li>
                </ul>
              </CardContent>
            </Card>

            {/* The 100,000 Model */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">The 100,000 Model</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our funding model is designed for sustainability, transparency, and community participation:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">100,000</div>
                    <div className="text-sm text-muted-foreground">Community Partners</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-electric mb-2">$5</div>
                    <div className="text-sm text-muted-foreground">USDC Contribution</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-success mb-2">$500K</div>
                    <div className="text-sm text-muted-foreground">Total Funding</div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Each contributor receives a unique Founding Deed NFT that includes profit-sharing royalties, 
                  governance rights, and exclusive access to platform features. This model ensures sustainable 
                  funding while distributing ownership and benefits across the entire community.
                </p>
              </CardContent>
            </Card>

            {/* Technical Architecture */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Technical Architecture</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org is built on Polygon (MATIC) for scalability and cost-effectiveness:
                </p>
                
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Smart Contract Infrastructure</h3>
                    <p className="leading-relaxed">
                      Our ERC-721 based Founding Deed contract includes built-in royalty distribution using ERC-2981 
                      standards, ensuring transparent and automatic profit sharing to all NFT holders.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Payment Processing</h3>
                    <p className="leading-relaxed">
                      The platform uses USDC as the primary payment token, providing stability and global accessibility 
                      while maintaining the benefits of blockchain technology.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Decentralized Governance</h3>
                    <p className="leading-relaxed">
                      Founding Deed holders participate in platform governance through a transparent voting mechanism, 
                      ensuring community-driven development and decision-making.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tokenomics */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Tokenomics & Profit Sharing</h2>
                
                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Revenue Distribution</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>60% - Ongoing development and operations</li>
                      <li>25% - Founding Deed holder royalties</li>
                      <li>10% - Platform treasury and governance</li>
                      <li>5% - Founder allocation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Referral Rewards</h3>
                    <p className="leading-relaxed">
                      Each successful referral earns $1 USDC, creating a sustainable growth mechanism that 
                      rewards early adopters and community builders.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Long-term Sustainability</h3>
                    <p className="leading-relaxed">
                      As the RePay API generates revenue through transaction fees and premium features, 
                      all Founding Deed holders automatically receive their proportional share through 
                      smart contract royalties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Roadmap */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Development Roadmap</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-foreground">Phase 1: Foundation (Q1 2024)</h3>
                    <p className="text-muted-foreground">Complete community funding, finalize platform architecture, begin RePay API development</p>
                  </div>
                  
                  <div className="border-l-4 border-electric pl-4">
                    <h3 className="font-semibold text-foreground">Phase 2: Development (Q2-Q3 2024)</h3>
                    <p className="text-muted-foreground">Launch RePay API beta, implement advanced features, onboard initial merchant partners</p>
                  </div>
                  
                  <div className="border-l-4 border-success pl-4">
                    <h3 className="font-semibold text-foreground">Phase 3: Launch (Q4 2024)</h3>
                    <p className="text-muted-foreground">Public API launch, begin profit sharing distributions, expand ecosystem partnerships</p>
                  </div>
                  
                  <div className="border-l-4 border-muted pl-4">
                    <h3 className="font-semibold text-foreground">Phase 4: Scale (2025+)</h3>
                    <p className="text-muted-foreground">Global expansion, additional payment products, advanced DeFi integrations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legal Framework */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Legal Framework</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org operates as a decentralized autonomous organization (DAO) with the following principles:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Full transparency in all operations and financial transactions</li>
                  <li>Community governance through Founding Deed holder voting</li>
                  <li>Compliance with applicable regulations in all operating jurisdictions</li>
                  <li>Open-source development with public code repositories</li>
                  <li>Regular financial audits and public reporting</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  All smart contracts are audited and verified on the blockchain, ensuring security and trustlessness 
                  for all participants in the ecosystem.
                </p>
              </CardContent>
            </Card>

            {/* Conclusion */}
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org represents more than just another fintech startup - it's a movement toward truly 
                  decentralized financial infrastructure. By combining innovative funding mechanisms with cutting-edge 
                  blockchain technology, we're creating a sustainable model for community-driven innovation.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Join us in building the future of payments. Together, we can create a more inclusive, efficient, 
                  and community-owned financial ecosystem that benefits everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};