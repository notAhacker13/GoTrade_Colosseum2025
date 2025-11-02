import { useState } from 'react';
import { TopNav } from './components/TopNav';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ConnectWalletModal } from './components/ConnectWalletModal';
import { Marketplace } from './pages/Marketplace';
import { GODetail } from './pages/GODetail';
import { GeneratorDashboard } from './pages/GeneratorDashboard';
import { MyPortfolio } from './pages/MyPortfolio';
import { Activity } from './pages/Activity';
import { AdminObservability } from './pages/AdminObservability';
import { ComponentsLibrary } from './pages/ComponentsLibrary';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Page = 'marketplace' | 'go-detail' | 'generator' | 'portfolio' | 'activity' | 'admin' | 'docs' | 'components';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('marketplace');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [selectedGOId, setSelectedGOId] = useState<string>('');

  const handleNavigate = (page: string) => {
    if (page === 'docs') {
      // Simulate external docs
      toast.info('Opening documentation...', {
        description: 'This would open the docs in a new tab',
      });
      return;
    }
    
    if (page === 'admin') {
      setCurrentPage('admin');
      return;
    }
    
    setCurrentPage(page as Page);
  };

  const handleConnectWallet = () => {
    if (!walletConnected) {
      setWalletModalOpen(true);
    }
  };

  const handleWalletConnect = () => {
    setWalletConnected(true);
    toast.success('Wallet connected successfully!', {
      description: 'You can now trade GO certificates',
    });
  };

  const handleSelectGO = (goId: string) => {
    setSelectedGOId(goId);
    setCurrentPage('go-detail');
  };

  const handleBackToMarketplace = () => {
    setCurrentPage('marketplace');
  };

  const handleBidSuccess = () => {
    toast.success('Transaction submitted!', {
      description: 'Your bid has been placed successfully',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav
        currentPage={currentPage === 'go-detail' ? 'marketplace' : currentPage}
        onNavigate={handleNavigate}
        walletConnected={walletConnected}
        onConnectWallet={handleConnectWallet}
      />

      <main>
        {currentPage === 'marketplace' && (
          <Marketplace onSelectGO={handleSelectGO} />
        )}

        {currentPage === 'go-detail' && (
          <GODetail
            goId={selectedGOId}
            onBack={handleBackToMarketplace}
            onBidSuccess={handleBidSuccess}
          />
        )}

        {currentPage === 'generator' && (
          <GeneratorDashboard />
        )}

        {currentPage === 'portfolio' && (
          <MyPortfolio />
        )}

        {currentPage === 'activity' && (
          <Activity />
        )}

        {currentPage === 'admin' && (
          <AdminObservability />
        )}

        {currentPage === 'components' && (
          <ComponentsLibrary />
        )}

        {currentPage === 'docs' && (
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl text-gray-900 mb-4">Documentation</h1>
            <p className="text-gray-600">
              This would be the documentation page with guides, API references, and more.
            </p>
          </div>
        )}
      </main>

      {/* Modals */}
      <ConnectWalletModal
        open={walletModalOpen}
        onOpenChange={setWalletModalOpen}
        onConnect={handleWalletConnect}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentPage={currentPage === 'go-detail' ? 'marketplace' : currentPage}
        onNavigate={handleNavigate}
        walletConnected={walletConnected}
        onConnectWallet={handleConnectWallet}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          classNames: {
            success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
            error: 'bg-red-50 border-red-200 text-red-900',
            info: 'bg-blue-50 border-blue-200 text-blue-900',
          },
        }}
      />
    </div>
  );
}
