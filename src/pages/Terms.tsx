import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';

export const Terms = () => {
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground">
              Legal terms and conditions for using ReferPay.org
            </p>
          </div>

          <div className="space-y-8">
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing or using ReferPay.org ("the Platform"), you agree to be bound by these Terms of Service 
                  ("Terms"). If you disagree with any part of these terms, then you may not access the Platform.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms constitute a legally binding agreement between you and ReferPay.org regarding your use 
                  of the Platform and its services.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Platform Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org is a decentralized launchpad platform that enables community funding of Web3 payment 
                  infrastructure projects. The Platform facilitates the issuance of Founding Deed NFTs that represent 
                  ownership stakes and profit-sharing rights in funded projects.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our genesis project is the development of "RePay," a developer-friendly payment gateway API for 
                  Web3 applications.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use the Platform, you must:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Be at least 18 years old</li>
                  <li>Have the legal capacity to enter into binding agreements</li>
                  <li>Not be located in a jurisdiction where use of the Platform is prohibited</li>
                  <li>Have access to a compatible Web3 wallet (MetaMask, Trust Wallet, etc.)</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">NFT Purchase and Ownership</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Purchase Terms</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Founding Deed NFTs are sold for 5 USDC each on the Polygon blockchain. All sales are final 
                      and non-refundable. The purchase grants you ownership of the NFT and associated rights as 
                      outlined in the smart contract.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ownership Rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      As a Founding Deed holder, you receive profit-sharing royalties, governance voting rights, 
                      and access to exclusive platform features. These rights are encoded in the smart contract 
                      and cannot be modified without community governance approval.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Transfer Rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      You may transfer your Founding Deed NFT to another wallet address. The new owner automatically 
                      receives all associated rights and benefits encoded in the smart contract.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Referral Program</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The Platform includes a referral program that rewards users for successful referrals:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Earn 1 USDC for each successful referral that results in an NFT purchase</li>
                  <li>Referral rewards are distributed automatically via smart contract</li>
                  <li>Referral fraud or manipulation will result in account termination</li>
                  <li>Self-referrals and circular referrals are prohibited</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Risks and Disclaimers</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Technology Risks</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Blockchain technology and cryptocurrencies involve significant risks including volatility, 
                      technical bugs, and regulatory uncertainty. You acknowledge and accept these risks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Investment Risk</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      NFT purchases and participation in profit-sharing arrangements involve investment risk. 
                      There is no guarantee of returns, and you may lose your entire investment.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">No Financial Advice</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Nothing on the Platform constitutes financial, investment, or legal advice. You should 
                      consult with qualified professionals before making any financial decisions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Violating any applicable laws or regulations</li>
                  <li>Engaging in fraudulent or deceptive practices</li>
                  <li>Attempting to manipulate smart contract functions</li>
                  <li>Interfering with the Platform's operation or security</li>
                  <li>Creating multiple accounts to circumvent restrictions</li>
                  <li>Using automated tools to interact with the Platform</li>
                  <li>Infringing on intellectual property rights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Governance</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org operates as a decentralized autonomous organization (DAO):
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Founding Deed holders have voting rights proportional to their holdings</li>
                  <li>Major platform decisions require community governance approval</li>
                  <li>Governance proposals are submitted and voted on transparently</li>
                  <li>Smart contract upgrades require multi-signature approval</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, REFERPAY.ORG SHALL NOT BE LIABLE FOR ANY INDIRECT, 
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF 
                  PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU HAVE PAID 
                  TO THE PLATFORM IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may terminate or suspend your access to the Platform immediately, without prior notice or 
                  liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Upon termination, your right to use the Platform will cease immediately. However, your ownership 
                  of NFTs and associated blockchain rights will remain intact as they are governed by smart contracts.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  If a revision is material, we will try to provide at least 30 days notice prior to any new 
                  terms taking effect.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="text-muted-foreground space-y-2">
                  <p>Email: legal@referpay.org</p>
                  <p>Website: https://referpay.org</p>
                  <p>Community: Discord and Twitter channels</p>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Last Updated: December 2024
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