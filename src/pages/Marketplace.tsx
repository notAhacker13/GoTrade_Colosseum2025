import { useState, useEffect } from 'react';
import { GOCard } from "../components/GOCard";
import { FilterSidebar } from "../components/FilterSidebar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Search, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { mockGOCertificates } from "../lib/mock-data";
import { GOCardsGridLoading } from "../components/LoadingStates";
import { NoResultsEmptyState } from "../components/EmptyStates";
import { LoadErrorState } from "../components/ErrorStates";

interface MarketplaceProps {
  onSelectGO: (goId: string) => void;
}

interface FilterState {
  generators: string[];
  regions: string[];
  renewableTypes: string[];
  priceRange: [number, number];
  carbonMax: number;
  status: string[];
}

export function Marketplace({ onSelectGO }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState<FilterState>({
    generators: [],
    regions: [],
    renewableTypes: [],
    priceRange: [0, 100],
    carbonMax: 50,
    status: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      // Simulate random error (5% chance)
      if (Math.random() < 0.05) {
        setError(true);
      }
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClearFilters = () => {
    setFilters({
      generators: [],
      regions: [],
      renewableTypes: [],
      priceRange: [0, 100],
      carbonMax: 50,
      status: [],
    });
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 800);
  };

  // Filter and sort GOs
  const filteredGOs = mockGOCertificates.filter((go) => {
    // Search filter
    if (searchQuery && !go.generatorName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !go.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(go.status)) {
      return false;
    }

    // Region filter
    if (filters.regions.length > 0) {
      const goCountry = go.location.split(',').pop()?.trim() || '';
      if (!filters.regions.some(region => goCountry.includes(region))) {
        return false;
      }
    }

    // Price filter
    const price = go.price || go.currentBid || 0;
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    // Carbon intensity filter
    if (go.carbonIntensity > filters.carbonMax) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return (a.price || a.currentBid || 0) - (b.price || b.currentBid || 0);
      case 'price-desc':
        return (b.price || b.currentBid || 0) - (a.price || a.currentBid || 0);
      case 'ending-soon':
        if (!a.auctionEnds) return 1;
        if (!b.auctionEnds) return -1;
        return new Date(a.auctionEnds).getTime() - new Date(b.auctionEnds).getTime();
      default: // newest
        return new Date(b.timeWindow.start).getTime() - new Date(a.timeWindow.start).getTime();
    }
  });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          onClear={handleClearFilters}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl text-gray-900 mb-2">GO Marketplace</h1>
            <p className="text-gray-600 mb-8">
              Trade verified renewable energy Guarantees of Origin on Solana
            </p>

            {/* Search Bar */}
            <div className="flex gap-3 max-w-3xl">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden bg-white">
                    <SlidersHorizontal className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                    <FilterSidebar
                      filters={filters}
                      onFiltersChange={setFilters}
                      onClear={handleClearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by generator, location, or certificate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-white hidden sm:flex">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectTrigger className="w-12 bg-white sm:hidden">
                  <ArrowUpDown className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {!loading && !error && (
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                {filteredGOs.length} certificate{filteredGOs.length !== 1 ? 's' : ''} available
              </div>
            </div>
          )}

          {loading ? (
            <GOCardsGridLoading count={6} />
          ) : error ? (
            <LoadErrorState onRetry={handleRetry} />
          ) : filteredGOs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGOs.map((go) => (
                <GOCard
                  key={go.id}
                  go={go}
                  onClick={() => onSelectGO(go.id)}
                />
              ))}
            </div>
          ) : (
            <NoResultsEmptyState onClearFilters={handleClearFilters} />
          )}
        </div>
      </div>
    </div>
  );
}
