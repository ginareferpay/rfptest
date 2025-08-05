import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { useWeb3 } from '@/hooks/useWeb3';

export const Privacy = () => {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              Your privacy and data protection on ReferPay.org
            </p>
          </div>

          <div className="space-y-8">
            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ReferPay.org ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                  of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                  your information when you visit our website and use our services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using ReferPay.org, you agree to the collection and use of information in accordance 
                  with this policy.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Blockchain Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We interact with public blockchain data, including wallet addresses, transaction hashes, and 
                      smart contract interactions. This information is publicly available on the Polygon blockchain.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We may collect information about how you access and use our website, including your IP address, 
                      browser type, device information, and pages visited.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Cookies and Tracking</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies and similar tracking technologies to enhance your browsing experience and analyze 
                      website usage. You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>To provide and maintain our services</li>
                  <li>To process blockchain transactions and interactions</li>
                  <li>To improve our website and user experience</li>
                  <li>To detect and prevent fraud or security issues</li>
                  <li>To comply with legal obligations</li>
                  <li>To communicate important updates and changes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to use commercially acceptable means to protect your personal information, 
                  we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Blockchain Transparency</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As a blockchain-based platform, certain information is inherently public and transparent:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Wallet addresses and transaction history</li>
                  <li>NFT ownership and transfers</li>
                  <li>Smart contract interactions</li>
                  <li>Token balances and transfers</li>
                </ul>
                
                <p className="text-muted-foreground leading-relaxed mt-4">
                  This information is recorded permanently on the blockchain and cannot be modified or deleted.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website may contain links to third-party websites or services, including:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Wallet providers (MetaMask, Trust Wallet)</li>
                  <li>Blockchain explorers (Polygonscan)</li>
                  <li>Social media platforms</li>
                  <li>Analytics services</li>
                </ul>
                
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We are not responsible for the privacy practices of these third-party services. 
                  We encourage you to review their privacy policies.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your jurisdiction, you may have the following rights:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Right to access your personal information</li>
                  <li>Right to rectify inaccurate information</li>
                  <li>Right to erasure (where legally possible)</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
                
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Note that some rights may be limited due to the immutable nature of blockchain technology.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="text-muted-foreground space-y-2">
                  <p>Email: privacy@referpay.org</p>
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