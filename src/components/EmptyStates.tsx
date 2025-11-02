import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Search, 
  Package, 
  TrendingUp, 
  Filter,
  AlertCircle,
  FileText,
  Activity,
  Zap,
  ShoppingCart
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action,
  className = "" 
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
        {icon || <FileText className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Specific empty states
export function NoResultsEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-gray-400" />}
      title="No certificates found"
      description="Try adjusting your filters or search query to find what you're looking for."
      action={{
        label: "Clear Filters",
        onClick: onClearFilters
      }}
    />
  );
}

export function NoOwnedGOsEmptyState({ onBrowseMarketplace }: { onBrowseMarketplace: () => void }) {
  return (
    <Card className="p-12">
      <EmptyState
        icon={<Package className="w-8 h-8 text-gray-400" />}
        title="No GO certificates yet"
        description="Start trading to add renewable energy certificates to your portfolio and track your carbon offset impact."
        action={{
          label: "Browse Marketplace",
          onClick: onBrowseMarketplace
        }}
      />
    </Card>
  );
}

export function NoBidsEmptyState({ onBrowseAuctions }: { onBrowseAuctions: () => void }) {
  return (
    <Card className="p-12">
      <EmptyState
        icon={<TrendingUp className="w-8 h-8 text-gray-400" />}
        title="No active bids"
        description="Browse the marketplace to place bids on GO certificates in auction and start building your renewable energy portfolio."
        action={{
          label: "Browse Auctions",
          onClick: onBrowseAuctions
        }}
      />
    </Card>
  );
}

export function NoActivityEmptyState() {
  return (
    <EmptyState
      icon={<Activity className="w-8 h-8 text-gray-400" />}
      title="No activity yet"
      description="Your trading activity and marketplace events will appear here once you start interacting with the platform."
    />
  );
}

export function NoFilteredActivityEmptyState() {
  return (
    <EmptyState
      icon={<Filter className="w-8 h-8 text-gray-400" />}
      title="No activity found"
      description="Try selecting a different filter to see more activity."
    />
  );
}

export function NoTransactionsEmptyState() {
  return (
    <div className="text-center py-8">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
        <FileText className="w-6 h-6 text-gray-400" />
      </div>
      <div className="text-sm text-gray-600">No transactions yet</div>
    </div>
  );
}

export function NoSettlementsEmptyState() {
  return (
    <Card className="p-12">
      <EmptyState
        icon={<ShoppingCart className="w-8 h-8 text-gray-400" />}
        title="No settlements yet"
        description="Your purchase history and settlements will appear here after you complete trades."
      />
    </Card>
  );
}

export function NoSlicesEmptyState() {
  return (
    <EmptyState
      icon={<Zap className="w-8 h-8 text-gray-400" />}
      title="No energy slices available"
      description="Energy generation data will appear here once the certificate is minted."
    />
  );
}
