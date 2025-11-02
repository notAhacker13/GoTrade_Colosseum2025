import { useState, useEffect } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { RedemptionModal } from "../components/RedemptionModal";
import { 
  Package, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Eye,
  Send,
  Recycle,
  ExternalLink
} from "lucide-react";
import { mockOwnedGOs, mockBids } from "../lib/mock-data";
import { formatCurrency, formatDate, getTimeRemaining } from "../lib/utils";
import { toast } from "sonner";
import { 
  StatsGridLoading, 
  PortfolioCardSkeleton, 
  TableRowSkeleton 
} from "../components/LoadingStates";
import { 
  NoOwnedGOsEmptyState, 
  NoBidsEmptyState,
  NoSettlementsEmptyState,
  NoTransactionsEmptyState
} from "../components/EmptyStates";
import { LoadErrorState } from "../components/ErrorStates";

export function MyPortfolio() {
  const [redemptionModalOpen, setRedemptionModalOpen] = useState(false);
  const [selectedGO, setSelectedGO] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRedeem = (goName: string) => {
    setSelectedGO(goName);
    setRedemptionModalOpen(true);
  };

  const handleRedemptionSuccess = () => {
    toast.success('Certificate redeemed successfully!');
  };

  const handleRaiseBid = (bidId: string) => {
    toast.success('Bid increased successfully!');
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 600);
  };

  const handleBrowseMarketplace = () => {
    toast.info('Navigate to marketplace');
  };

  const usdcBalance = 1250.50;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">My Portfolio</h1>
        <p className="text-gray-600">Manage your GO certificates and trading activity</p>
      </div>

      {/* Summary Cards */}
      {loading ? (
        <StatsGridLoading count={4} />
      ) : error ? (
        <div className="mb-8">
          <LoadErrorState onRetry={handleRetry} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Owned GOs</div>
                <div className="text-xl text-gray-900">{mockOwnedGOs.length}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Active Bids</div>
                <div className="text-xl text-gray-900">{mockBids.length}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">USDC Balance</div>
                <div className="text-xl text-gray-900">{formatCurrency(usdcBalance)}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Redeemed</div>
                <div className="text-xl text-gray-900">0</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="owned" className="w-full">
        <TabsList>
          <TabsTrigger value="owned">Owned GOs ({mockOwnedGOs.length})</TabsTrigger>
          <TabsTrigger value="bids">My Bids ({mockBids.length})</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
          <TabsTrigger value="usdc">USDC</TabsTrigger>
        </TabsList>

        {/* Owned GOs */}
        <TabsContent value="owned" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-4">
              <PortfolioCardSkeleton />
              <PortfolioCardSkeleton />
            </div>
          ) : error ? (
            <LoadErrorState onRetry={handleRetry} />
          ) : mockOwnedGOs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {mockOwnedGOs.map((go) => (
                <Card key={go.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-gray-900">{go.generatorName}</h3>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Owned
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <div className="text-gray-600 mb-1">Time Window</div>
                          <div className="text-gray-900">{formatDate(go.timeWindow.start)}</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Volume</div>
                          <div className="text-gray-900">{go.volume} MWh</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Carbon Intensity</div>
                          <div className="text-gray-900">{go.carbonIntensity} gCO₂/kWh</div>
                        </div>
                        <div>
                          <div className="text-gray-600 mb-1">Purchase Price</div>
                          <div className="text-gray-900">{formatCurrency(go.price || 0)}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">View Details</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="w-4 h-4 md:mr-2" />
                          <span className="hidden md:inline">Transfer</span>
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => handleRedeem(go.generatorName)}
                        >
                          <Recycle className="w-4 h-4 md:mr-2" />
                          <span className="hidden sm:inline">Redeem for Carbon Offset</span>
                          <span className="sm:hidden">Redeem</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <NoOwnedGOsEmptyState onBrowseMarketplace={handleBrowseMarketplace} />
          )}
        </TabsContent>

        {/* My Bids */}
        <TabsContent value="bids" className="mt-6">
          {loading ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Your Bid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ends In</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRowSkeleton columns={5} />
                  <TableRowSkeleton columns={5} />
                </TableBody>
              </Table>
            </Card>
          ) : error ? (
            <LoadErrorState onRetry={handleRetry} />
          ) : mockBids.length > 0 ? (
            <>
              {/* Desktop Table */}
              <Card className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Your Bid</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ends In</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell>
                          <div className="text-gray-900">{bid.goName}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{formatCurrency(bid.amount)}</div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              bid.status === 'leading' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              bid.status === 'outbid' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-gray-50 text-gray-700 border-gray-200'
                            }
                          >
                            {bid.status === 'leading' ? '🏆 Leading' : 
                             bid.status === 'outbid' ? '⚠️ Outbid' : 
                             bid.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-gray-900">{getTimeRemaining(bid.endsAt)}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            {bid.status === 'outbid' && (
                              <Button 
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => handleRaiseBid(bid.id)}
                              >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Raise Bid
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {mockBids.map((bid) => (
                  <Card key={bid.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-gray-900 mb-2">{bid.goName}</div>
                        <Badge 
                          variant="outline"
                          className={
                            bid.status === 'leading' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                            bid.status === 'outbid' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                          }
                        >
                          {bid.status === 'leading' ? '🏆 Leading' : 
                           bid.status === 'outbid' ? '⚠️ Outbid' : 
                           bid.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <div className="text-gray-600 mb-1">Your Bid</div>
                        <div className="text-gray-900">{formatCurrency(bid.amount)}</div>
                      </div>
                      <div>
                        <div className="text-gray-600 mb-1">Ends In</div>
                        <div className="text-gray-900">{getTimeRemaining(bid.endsAt)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {bid.status === 'outbid' && (
                        <Button 
                          size="sm"
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => handleRaiseBid(bid.id)}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Raise Bid
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <NoBidsEmptyState onBrowseAuctions={handleBrowseMarketplace} />
          )}
        </TabsContent>

        {/* Settlements */}
        <TabsContent value="settlements" className="mt-6">
          {loading ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRowSkeleton columns={5} />
                </TableBody>
              </Table>
            </Card>
          ) : error ? (
            <LoadErrorState onRetry={handleRetry} />
          ) : (
          <>
            {/* Desktop Table */}
            <Card className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Oct 26, 2025</TableCell>
                    <TableCell>Dublin Solar Array • Oct 25, 2025</TableCell>
                    <TableCell>{formatCurrency(35)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        Purchase
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View TX
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            {/* Mobile Card */}
            <Card className="md:hidden p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">Dublin Solar Array • Oct 25, 2025</div>
                    <div className="text-sm text-gray-600">Oct 26, 2025</div>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    Purchase
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-900">{formatCurrency(35)}</div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View TX
                  </Button>
                </div>
              </div>
            </Card>
          </>
          )}
        </TabsContent>

        {/* USDC */}
        <TabsContent value="usdc" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">USDC Balance</h3>
              
              <div className="mb-6">
                <div className="text-3xl text-gray-900 mb-2">{formatCurrency(usdcBalance)}</div>
                <div className="text-sm text-gray-600">Available for trading</div>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Top Up USDC
                </Button>
                <Button variant="outline" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Swap Tokens
                </Button>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-900 mb-1">ℹ️ Top Up Options</div>
                <div className="text-xs text-blue-800">
                  You can add USDC via fiat onramp or transfer from another wallet
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Recent Transactions</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-900">Purchase GO Certificate</div>
                    <div className="text-xs text-gray-600">Oct 26, 2025 • 08:30 AM</div>
                  </div>
                  <div className="text-red-600">-{formatCurrency(35)}</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-900">Platform Fee Refund</div>
                    <div className="text-xs text-gray-600">Oct 25, 2025 • 02:15 PM</div>
                  </div>
                  <div className="text-emerald-600">+{formatCurrency(0.25)}</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-900">Deposit</div>
                    <div className="text-xs text-gray-600">Oct 20, 2025 • 10:00 AM</div>
                  </div>
                  <div className="text-emerald-600">+{formatCurrency(1500)}</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Redemption Modal */}
      <RedemptionModal
        open={redemptionModalOpen}
        onOpenChange={setRedemptionModalOpen}
        goName={selectedGO}
        onSuccess={handleRedemptionSuccess}
      />
    </div>
  );
}
