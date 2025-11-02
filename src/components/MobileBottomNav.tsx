import { Store, Briefcase, Activity, Menu, Wallet } from "lucide-react";

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  walletConnected: boolean;
  onConnectWallet: () => void;
}

export function MobileBottomNav({ currentPage, onNavigate, walletConnected, onConnectWallet }: MobileBottomNavProps) {
  const navItems = [
    { id: 'marketplace', label: 'Market', icon: Store },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'menu', label: 'Menu', icon: Menu },
  ];

  return (
    <>
      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || 
              (item.id === 'marketplace' && currentPage === 'go-detail');
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? 'text-emerald-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Connect Wallet FAB - Mobile Only */}
      {!walletConnected && (
        <button
          onClick={onConnectWallet}
          className="md:hidden fixed bottom-20 right-4 bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-40 hover:bg-indigo-700 active:scale-95 transition-transform"
        >
          <Wallet className="w-5 h-5" />
          <span className="text-sm">Connect</span>
        </button>
      )}

      {/* Mobile padding to prevent content being hidden behind bottom nav */}
      <div className="md:hidden h-16"></div>
    </>
  );
}
