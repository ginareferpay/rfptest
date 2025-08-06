import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wallet } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';

interface HeaderProps {
  onConnectWallet: () => void;
  onDisconnectWallet: () => void;
  isConnected: boolean;
  account?: string | null;
  showDashboardNav?: boolean;
}

export const Header = ({ 
  onConnectWallet, 
  onDisconnectWallet, 
  isConnected, 
  account,
  showDashboardNav = false 
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const publicNavItems = [
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Community', href: '#community' },
  ];

  const dashboardNavItems = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Bounty Board', href: '#bounty-board' },
    { name: 'AI Toolkit', href: '#ai-toolkit' },
  ];

  const navItems = showDashboardNav ? dashboardNavItems : publicNavItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-card-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <div className="w-6 h-6 bg-background rounded-sm flex items-center justify-center">
                <span className="text-primary font-bold text-sm">R</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">ReferPay</span>
              <span className="text-xs text-muted-foreground">.org</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Wallet Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="px-3 py-2 rounded-lg bg-card border border-card-border">
                  <span className="text-sm font-medium text-foreground">
                    {account && formatAddress(account)}
                  </span>
                </div>
                <Button
                  onClick={onDisconnectWallet}
                  variant="outline"
                  size="sm"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={onConnectWallet}
                className="btn-gradient text-primary-foreground font-semibold"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-card-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
                <div className="pt-4 border-t border-card-border">
                {isConnected ? (
                  <div className="space-y-3">
                    <div className="px-3 py-2 rounded-lg bg-card border border-card-border">
                      <span className="text-sm font-medium text-foreground">
                        {account && formatAddress(account)}
                      </span>
                    </div>
                    <Button
                      onClick={() => {
                        onDisconnectWallet();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      onConnectWallet();
                      setIsMenuOpen(false);
                    }}
                    className="w-full btn-gradient text-primary-foreground font-semibold"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};