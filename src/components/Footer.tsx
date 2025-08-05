import { Github, Twitter, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-background-secondary border-t border-card-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <div className="w-6 h-6 bg-background rounded-sm flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">R</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">ReferPay</span>
                <span className="text-xs text-muted-foreground">.org</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              The first decentralized digital entity building the future of Web3 payments.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/whitepaper" className="hover:text-primary transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-primary transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a 
                  href="https://polygonscan.com/address/0x19C1d81A794411a85666754839B865cBFb61f724" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors"
                >
                  Smart Contract
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/whitepaper" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://twitter.com/referpay_org" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/referpay" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/referpay" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary transition-colors flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2024 ReferPay.org. Built with transparency on Polygon.
          </div>
          <div className="text-sm text-muted-foreground mt-4 md:mt-0">
            Satoshi Nakamoto • First Decentralized Digital Entity • 2050
          </div>
        </div>
      </div>
    </footer>
  );
};