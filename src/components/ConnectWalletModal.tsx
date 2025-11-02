import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface ConnectWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

const wallets = [
  { name: 'Phantom', icon: '👻', popular: true },
  { name: 'Solflare', icon: '🔥', popular: true },
  { name: 'Backpack', icon: '🎒', popular: false },
  { name: 'Glow', icon: '✨', popular: false },
  { name: 'Slope', icon: '⛰️', popular: false },
];

export function ConnectWalletModal({ open, onOpenChange, onConnect }: ConnectWalletModalProps) {
  const handleConnect = (walletName: string) => {
    // Simulate connection
    setTimeout(() => {
      onConnect();
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Connect your Solana wallet to trade Guarantees of Origin on the blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 mt-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {wallet.icon}
                </div>
                <div className="text-left">
                  <div className="text-gray-900">{wallet.name}</div>
                  {wallet.popular && (
                    <div className="text-xs text-gray-500">Popular</div>
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-400 group-hover:text-emerald-600">
                Connect →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <div className="text-blue-600 mt-0.5">ℹ️</div>
            <div>
              <div className="text-sm text-blue-900 mb-1">New to Solana?</div>
              <div className="text-xs text-blue-700">
                Install a wallet extension to get started. We recommend Phantom or Solflare for beginners.
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
