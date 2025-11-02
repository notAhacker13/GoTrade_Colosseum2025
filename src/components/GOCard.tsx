import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Wind, MapPin, Clock, Zap } from "lucide-react";
import { GOCertificate } from "../lib/mock-data";
import { formatCurrency, formatDate, getTimeRemaining } from "../lib/utils";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GOCardProps {
  go: GOCertificate;
  onClick: () => void;
}

const nftImages: Record<string, string> = {
  'wind-turbine': 'https://images.unsplash.com/photo-1629707921873-e926840b5417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzYxODIxNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'solar-panels': 'https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGZpZWxkfGVufDF8fHx8MTc2MTcwNTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'offshore-wind': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMHdpbmQlMjBmYXJtfGVufDF8fHx8MTc2MTgyMTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'wind-farm': 'https://images.unsplash.com/photo-1629707921873-e926840b5417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kJTIwdHVyYmluZXMlMjBlbmVyZ3l8ZW58MXx8fHwxNzYxODIxNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'solar-field': 'https://images.unsplash.com/photo-1626251376234-8bc112f0bcd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVscyUyMGZpZWxkfGVufDF8fHx8MTc2MTcwNTU0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  'hydro-power': 'https://images.unsplash.com/photo-1548337138-e87d889cc369?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZzaG9yZSUyMHdpbmQlMjBmYXJtfGVufDF8fHx8MTc2MTgyMTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
};

export function GOCard({ go, onClick }: GOCardProps) {
  const statusColors = {
    'On Auction': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Buy Now': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Soon': 'bg-amber-100 text-amber-700 border-amber-200',
    'Sold Out': 'bg-gray-100 text-gray-600 border-gray-200',
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <ImageWithFallback
          src={nftImages[go.nftImage] || nftImages['wind-turbine']}
          alt={go.generatorName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className={`${statusColors[go.status]} border`}>
            {go.status}
          </Badge>
        </div>
        {go.renewableType && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <Wind className="w-4 h-4 text-emerald-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 mb-1">{go.generatorName}</h3>
        <div className="flex items-center gap-1 text-gray-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span className="text-sm">{go.location}</span>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
          <div>
            <div className="text-xs text-gray-500 mb-1">Time Window</div>
            <div className="text-sm text-gray-900">{formatDate(go.timeWindow.start)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Volume</div>
            <div className="text-sm text-gray-900 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500" />
              {go.volume} MWh
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Carbon Intensity</div>
            <div className="text-sm text-gray-900">{go.carbonIntensity} gCO₂/kWh</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">
              {go.status === 'On Auction' ? 'Ends In' : 'Type'}
            </div>
            {go.status === 'On Auction' && go.auctionEnds ? (
              <div className="text-sm text-gray-900 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                {getTimeRemaining(go.auctionEnds)}
              </div>
            ) : (
              <div className="text-sm text-gray-900 capitalize">{go.renewableType}</div>
            )}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div>
            {go.status === 'On Auction' && go.currentBid !== undefined ? (
              <>
                <div className="text-xs text-gray-500">Current Bid</div>
                <div className="text-gray-900">{formatCurrency(go.currentBid)}</div>
              </>
            ) : go.price !== undefined ? (
              <>
                <div className="text-xs text-gray-500">Price</div>
                <div className="text-gray-900">{formatCurrency(go.price)}</div>
              </>
            ) : (
              <div className="text-sm text-gray-500">Coming Soon</div>
            )}
          </div>

          {go.status === 'On Auction' && (
            <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
              Place Bid
            </Button>
          )}
          {go.status === 'Buy Now' && (
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Buy Now
            </Button>
          )}
          {go.status === 'Sold Out' && (
            <Button size="sm" variant="ghost" disabled>
              Sold Out
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
