import { Button } from "./ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Wallet, User, Settings, LogOut, FileText } from "lucide-react";

interface TopNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  walletConnected: boolean;
  onConnectWallet: () => void;
}

export function TopNav({ currentPage, onNavigate, walletConnected, onConnectWallet }: TopNavProps) {
  const navItems = [
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'generator', label: 'Generator Dashboard' },
    { id: 'portfolio', label: 'My Portfolio' },
    { id: 'activity', label: 'Activity' },
    { id: 'docs', label: 'Docs' },
  ];

  // Add hidden dev tools for demo
  const devNavItems = [
    { id: 'admin', label: '⚙️ Admin' },
    { id: 'components', label: '🎨 Components' },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('marketplace')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white">GO</span>
              </div>
              <span className="text-gray-900">GoTrade</span>
            </button>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md transition-colors ${
                    currentPage === item.id
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              {devNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md transition-colors text-xs ${
                    currentPage === item.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {!walletConnected ? (
              <Button onClick={onConnectWallet} className="bg-indigo-600 hover:bg-indigo-700">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <>
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-200 bg-emerald-50">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-emerald-700">7A4B...9F2C</span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate('portfolio')}>
                      <Wallet className="w-4 h-4 mr-2" />
                      Portfolio
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('activity')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Activity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
