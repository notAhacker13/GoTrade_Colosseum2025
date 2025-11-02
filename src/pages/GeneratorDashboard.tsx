import { useState } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { StatCard } from "../components/StatCard";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { 
  Zap, 
  Clock, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Info,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { mockGeneratorStats, mockGenerationData } from "../lib/mock-data";
import { formatTimeUTC, getStatusColor } from "../lib/utils";
import { toast } from "sonner";

export function GeneratorDashboard() {
  const stats = mockGeneratorStats;
  const [mintStep, setMintStep] = useState(1);
  const [autoList, setAutoList] = useState(true);
  const [listingType, setListingType] = useState('auction');
  const [minting, setMinting] = useState(false);

  const recentSlices = mockGenerationData.slice(-20).reverse();

  const handleMint = () => {
    setMinting(true);
    
    setTimeout(() => {
      setMinting(false);
      toast.success('GO Certificate minted successfully!', {
        description: 'Transaction confirmed on Solana',
      });
      setMintStep(1);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl text-gray-900 mb-2">Generator Dashboard</h1>
        <p className="text-gray-600">WindFarm Oslo North • WF-NO-001</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3 mb-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Data ingestion running normally • Last sync: 2 minutes ago</span>
            <Button variant="ghost" size="sm">View Logs</Button>
          </AlertDescription>
        </Alert>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Live Power Output"
          value={`${stats.livePower} MW`}
          icon={Zap}
          trend={{ value: '5.2% vs avg', positive: true }}
        />
        <StatCard
          title="Last Slice"
          value={formatTimeUTC(stats.lastSliceTimestamp)}
          subtitle="2 mins ago"
          icon={Clock}
        />
        <StatCard
          title="Slices in Current Bucket"
          value={stats.slicesInBucket}
          subtitle={`${stats.accruedVolume.toFixed(2)} MWh accrued`}
          icon={Package}
        />
        <StatCard
          title="Mintable Units"
          value={stats.mintableUnits}
          subtitle={stats.mintableUnits > 0 ? "Ready to mint" : "Accumulating..."}
          icon={Package}
        />
        <StatCard
          title="Lifetime Minted"
          value={`${stats.lifetimeMinted} MWh`}
          subtitle="248 certificates"
          icon={TrendingUp}
        />
        <StatCard
          title="Pending Revenue"
          value="$2,847"
          subtitle="From active auctions"
          icon={TrendingUp}
        />
      </div>

      {/* Generation Chart */}
      <Card className="p-6 mb-8">
        <h3 className="text-gray-900 mb-4">Last 24 Hours Generation</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockGenerationData}>
              <defs>
                <linearGradient id="colorKwh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="formatted" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                interval={23}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="kWh" 
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorKwh)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Slices Table */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Recent Slices</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time (UTC)</TableHead>
                  <TableHead>kWh</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentSlices.slice(0, 10).map((slice, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">
                      {slice.formatted}
                    </TableCell>
                    <TableCell>{slice.kWh}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor('verified')} border`}
                      >
                        verified
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Mint Wizard */}
        <Card className="p-6">
          <h3 className="text-gray-900 mb-4">Mint GO Certificate</h3>

          {stats.mintableUnits === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-gray-600 mb-2">No complete units to mint</div>
              <div className="text-sm text-gray-500">
                Current: {stats.accruedVolume.toFixed(2)} / 1.00 MWh
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all"
                    style={{ width: `${stats.accruedVolume * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Steps */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      mintStep >= step 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`flex-1 h-0.5 mx-2 ${
                        mintStep > step ? 'bg-emerald-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Select Time Window */}
              {mintStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 mb-2">Step 1: Select Time Window</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Auto-bucketed 1 MWh from latest verified slices
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Slices Selected:</span>
                        <span className="text-gray-900">100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Volume:</span>
                        <span className="text-gray-900">1.00 MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Range:</span>
                        <span className="text-gray-900 font-mono">14:00 - 00:40 UTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg CO₂:</span>
                        <span className="text-gray-900">12 gCO₂/kWh</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setMintStep(2)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Continue to Metadata
                  </Button>
                </div>
              )}

              {/* Step 2: Review Metadata */}
              {mintStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 mb-2">Step 2: Review Metadata</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Confirm certificate details
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label>Generator ID</Label>
                      <Input value="WF-NO-001" disabled />
                    </div>
                    <div>
                      <Label>Batch ID</Label>
                      <Input value={`BATCH-${Date.now()}`} disabled />
                    </div>
                    <div>
                      <Label>Carbon Intensity</Label>
                      <Input value="12 gCO₂/kWh" disabled />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setMintStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setMintStep(3)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      Continue to Listing
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Listing Options */}
              {mintStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 mb-2">Step 3: Listing Options</h4>
                  </div>

                  <RadioGroup value={listingType} onValueChange={setListingType}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-indigo-300 cursor-pointer">
                        <RadioGroupItem value="auction" id="auction" />
                        <Label htmlFor="auction" className="flex-1 cursor-pointer">
                          <div className="text-gray-900">Auction</div>
                          <div className="text-sm text-gray-500">Let buyers bid competitively</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-emerald-300 cursor-pointer">
                        <RadioGroupItem value="fixed" id="fixed" />
                        <Label htmlFor="fixed" className="flex-1 cursor-pointer">
                          <div className="text-gray-900">Fixed Price</div>
                          <div className="text-sm text-gray-500">Set a buy-now price</div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {listingType === 'auction' && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="reserve">Reserve Price (USDC)</Label>
                        <Input id="reserve" type="number" placeholder="40.00" />
                      </div>
                      <div>
                        <Label htmlFor="minIncrement">Min Bid Increment (USDC)</Label>
                        <Input id="minIncrement" type="number" placeholder="0.50" />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (hours)</Label>
                        <Input id="duration" type="number" placeholder="48" />
                      </div>
                    </div>
                  )}

                  {listingType === 'fixed' && (
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="price">Price (USDC)</Label>
                        <Input id="price" type="number" placeholder="45.00" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm text-blue-900">Auto-list after mint</div>
                      <div className="text-xs text-blue-700">List immediately on marketplace</div>
                    </div>
                    <Switch checked={autoList} onCheckedChange={setAutoList} />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setMintStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setMintStep(4)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      Continue to Confirm
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirm & Mint */}
              {mintStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 mb-2">Step 4: Confirm & Mint</h4>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network:</span>
                      <span className="text-gray-900">Solana Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Minting Fee:</span>
                      <span className="text-gray-900">~0.00001 SOL</span>
                    </div>
                    {autoList && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Listing Fee:</span>
                        <span className="text-gray-900">0.5% of sale</span>
                      </div>
                    )}
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This will create an NFT on Solana representing your GO certificate
                    </AlertDescription>
                  </Alert>

                  {!minting ? (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => setMintStep(3)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleMint}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Mint Certificate
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                        <div className="text-center">
                          <div className="text-gray-900">Minting in progress...</div>
                          <div className="text-sm text-gray-600">Please approve in your wallet</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
