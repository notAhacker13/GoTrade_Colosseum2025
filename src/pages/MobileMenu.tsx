import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  Wind,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronRight
} from "lucide-react";

interface MobileMenuProps {
  onNavigate: (page: string) => void;
  walletConnected: boolean;
}

export function MobileMenu({ onNavigate, walletConnected }: MobileMenuProps) {
  const menuItems = [
    { id: 'generator', label: 'Generator Dashboard', icon: Wind, description: 'Mint and manage GOs' },
    { id: 'docs', label: 'Documentation', icon: FileText, description: 'Guides and API docs' },
    { id: 'components', label: 'Components Library', icon: Settings, description: 'Design system' },
    { id: 'admin', label: 'Admin Panel', icon: Settings, description: 'System observability' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Menu</h1>
        {walletConnected && (
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" />
            <span>7A4B...9F2C</span>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 ml-2">
              Connected
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-98"
              onClick={() => onNavigate(item.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
              </div>
            </Card>
          );
        })}
      </div>

      {walletConnected && (
        <div className="space-y-3">
          <Card className="p-4">
            <h3 className="text-gray-900 mb-3">Account</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect Wallet
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>GO Marketplace v1.0.0</p>
        <p className="mt-1">Powered by Solana</p>
      </div>
    </div>
  );
}
