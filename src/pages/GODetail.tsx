import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
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
import { Alert, AlertDescription } from "../components/ui/alert";
import { PlaceBidModal } from "../components/PlaceBidModal";
import { BuyNowModal } from "../components/BuyNowModal";
import { ActivityTimeline } from "../components/ActivityTimeline";
import { 
  MapPin, 
  Calendar, 
  Zap, 
  Wind, 
  Clock, 
  ExternalLink, 
  ChevronDown,
  ChevronUp,
  Info,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { mockGOCertificates } from "../lib/mock-data";
import { formatCurrency, formatDate, formatTimeUTC, getTimeRemaining, shortenSignature, getStatusColor } from "../lib/utils";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface GODetailProps {
  goId: string;
  onBack: () => void;
  onBidSuccess: () => void;
}

const nftImages: Record<string, string> = {
  'wind-turbine': 'https://images.unsplash.com/photo-1629707921873-e926840b5417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzYxODIxNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'solar-panels': 'https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGZpZWxkfGVufDF8fHx8MTc2MTcwNTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'offshore-wind': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMHdpbmQlMjBmYXJtfGVufDF8fHx8MTc2MTgyMTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'wind-farm': 'https://images.unsplash.com/photo-1629707921873-e926840b5417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzYxODIxNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'solar-field': 'https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGZpZWxkfGVufDF8fHx8MTc2MTcwNTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'hydro-power': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMHdpbmQlMjBmYXJtfGVufDF8fHx8MTc2MTgyMTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
};

export function GODetail({ goId, onBack, onBidSuccess }: GODetailProps) {
  const go = mockGOCertificates.find(g => g.id === goId);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [expandedSlices, setExpandedSlices] = useState<number[]>([]);

  if (!go) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl text-gray-900 mb-4">Certificate not found</h2>
          <Button onClick={onBack}>Back to Marketplace</Button>
        </div>
      </div>
    );
  }

  const toggleSliceExpanded = (index: number) => {
    setExpandedSlices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleBidSuccess = () => {
    onBidSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          ← Back to Marketplace
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Card */}
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gray-100">
              <ImageWithFallback
                src={nftImages[go.nftImage] || nftImages['wind-turbine']}
                alt={go.generatorName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-gray-200">
                  {go.status}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              <h1 className="text-2xl text-gray-900 mb-4">{go.generatorName}</h1>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{go.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Wind className="w-4 h-4" />
                  <span className="capitalize">{go.renewableType}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(go.timeWindow.start)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Zap className="w-4 h-4" />
                  <span>{go.volume} MWh</span>
                </div>
              </div>

              {/* Verification Badges */}
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Verified Standards
                </div>
                <div className="flex flex-wrap gap-2">
                  {go.verificationBadges.map((badge) => (
                    <Badge key={badge} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Attributes */}
              <div>
                <div className="text-sm text-gray-600 mb-2">Technical Details</div>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(go.attributes).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-xs text-gray-500 mb-1">{key}</div>
                      <div className="text-sm text-gray-900">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Data Tabs */}
          <Tabs defaultValue="slices" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="slices">Generation Data ({go.slices.length} slices)</TabsTrigger>
              <TabsTrigger value="activity">On-Chain Activity</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="slices" className="mt-4">
              <Card>
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-4">
                    10-minute generation slices • Total: {go.volume} MWh • Avg CO₂: {go.carbonIntensity} gCO₂/kWh
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp (UTC)</TableHead>
                          <TableHead>kWh</TableHead>
                          <TableHead>CO₂e (g)</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>On-Chain</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {go.slices.slice(0, 20).map((slice, index) => (
                          <>
                            <TableRow key={index}>
                              <TableCell className="font-mono text-sm">
                                {formatTimeUTC(slice.timestamp)}
                              </TableCell>
                              <TableCell>{slice.kWh}</TableCell>
                              <TableCell>{slice.co2e}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(slice.sourceStatus)} border`}
                                >
                                  {slice.sourceStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant="outline" 
                                  className={`${getStatusColor(slice.onChainStatus)} border`}
                                >
                                  {slice.onChainStatus}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleSliceExpanded(index)}
                                >
                                  {expandedSlices.includes(index) ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                            {expandedSlices.includes(index) && (
                              <TableRow>
                                <TableCell colSpan={6} className="bg-gray-50">
                                  <div className="p-4">
                                    <div className="text-sm text-gray-600 mb-2">Raw API Payload:</div>
                                    <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{JSON.stringify({
  timestamp: slice.timestamp,
  energy_kwh: slice.kWh,
  carbon_intensity_g_per_kwh: slice.co2e / slice.kWh,
  generator_id: go.generatorId,
  verification_status: slice.sourceStatus,
  signature: '0x' + Math.random().toString(36).substring(2, 15)
}, null, 2)}
                                    </pre>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {go.slices.length > 20 && (
                    <div className="text-center mt-4">
                      <Button variant="outline" size="sm">
                        Load More Slices
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card className="p-6">
                <ActivityTimeline activities={go.activities} />
                {go.activities.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No on-chain activity yet
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="about" className="mt-4">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-gray-900 mb-2">About This Certificate</h3>
                    <p className="text-gray-600">
                      This Guarantee of Origin certificate represents {go.volume} MWh of renewable energy generated 
                      by {go.generatorName} in {go.location}. The energy was produced during the time window 
                      from {formatDate(go.timeWindow.start)} to {formatDate(go.timeWindow.end)}.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">Carbon Intensity</h3>
                    <p className="text-gray-600">
                      This generation has a carbon intensity of {go.carbonIntensity} gCO₂/kWh, which is 
                      significantly lower than the grid average.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gray-900 mb-2">Verification</h3>
                    <p className="text-gray-600">
                      All generation data has been verified by third-party auditors and meets the standards: {' '}
                      {go.verificationBadges.join(', ')}.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Auction/Buy Panel */}
        <div className="space-y-6">
          {/* Auction Panel */}
          {go.status === 'On Auction' && go.currentBid && go.minBid && go.auctionEnds && (
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Auction Details</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Current Bid</div>
                  <div className="text-2xl text-gray-900">{formatCurrency(go.currentBid)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Min. Next Bid</div>
                    <div className="text-gray-900">{formatCurrency(go.minBid)}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Reserve Price</div>
                    <div className="text-gray-900">{formatCurrency(go.reserve || 0)}</div>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Ends in {getTimeRemaining(go.auctionEnds)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => setBidModalOpen(true)}
                >
                  Place Bid
                </Button>

                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <Info className="w-4 h-4" />
                    Transaction fees: ~0.000005 SOL + 0.5%
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* Buy Now Panel */}
          {go.status === 'Buy Now' && go.price && (
            <Card className="p-6">
              <h3 className="text-gray-900 mb-4">Buy Now</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="text-2xl text-gray-900">{formatCurrency(go.price)}</div>
                </div>

                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => setBuyModalOpen(true)}
                >
                  Buy Now
                </Button>

                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <Info className="w-4 h-4" />
                    Transaction fees: ~0.000005 SOL + 0.5%
                  </button>
                </div>
              </div>
            </Card>
          )}

          {/* KYC Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              KYC verification required for purchases over 10 MWh per month
            </AlertDescription>
          </Alert>

          {/* Carbon Impact */}
          <Card className="p-6 bg-emerald-50 border-emerald-200">
            <h3 className="text-emerald-900 mb-3">🌱 Carbon Impact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-800">Avoided Emissions:</span>
                <span className="text-emerald-900">~450 kg CO₂</span>
              </div>
              <div className="text-xs text-emerald-700 mt-2">
                vs. EU grid average of 275 gCO₂/kWh
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <PlaceBidModal
        open={bidModalOpen}
        onOpenChange={setBidModalOpen}
        goName={go.generatorName}
        currentBid={go.currentBid || 0}
        minBid={go.minBid || 0}
        onSuccess={handleBidSuccess}
      />

      <BuyNowModal
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
        goName={go.generatorName}
        price={go.price || 0}
        onSuccess={handleBidSuccess}
      />
    </div>
  );
}
