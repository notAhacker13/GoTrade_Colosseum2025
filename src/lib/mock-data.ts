// Mock data for GO Marketplace

export interface GOCertificate {
  id: string;
  generatorName: string;
  generatorId: string;
  location: string;
  timeWindow: {
    start: string;
    end: string;
  };
  volume: number; // MWh
  price?: number;
  currentBid?: number;
  minBid?: number;
  reserve?: number;
  auctionEnds?: string;
  carbonIntensity: number; // gCO2/kWh
  renewableType: 'wind' | 'solar';
  status: 'On Auction' | 'Buy Now' | 'Soon' | 'Sold Out';
  verificationBadges: string[];
  nftImage: string;
  attributes: Record<string, string>;
  slices: Slice[];
  activities: Activity[];
}

export interface Slice {
  timestamp: string;
  kWh: number;
  co2e: number;
  sourceStatus: 'verified' | 'pending' | 'failed';
  onChainStatus: 'minted' | 'pending' | 'none';
}

export interface Activity {
  type: 'Minted' | 'Listed' | 'Bid Placed' | 'Outbid' | 'Settled' | 'Redeemed' | 'Transfer';
  timestamp: string;
  description: string;
  signature?: string;
  status: 'success' | 'pending' | 'failed';
  amount?: number;
  user?: string;
}

export interface GeneratorStats {
  livePower: number; // MW
  lastSliceTimestamp: string;
  slicesInBucket: number;
  accruedVolume: number; // MWh
  mintableUnits: number;
  lifetimeMinted: number;
}

export interface Bid {
  id: string;
  goId: string;
  goName: string;
  amount: number;
  timestamp: string;
  status: 'leading' | 'outbid' | 'won' | 'lost';
  endsAt: string;
}

// Sample GO Certificates
export const mockGOCertificates: GOCertificate[] = [
  {
    id: 'go-001',
    generatorName: 'Wexford Wind Farm',
    generatorId: 'WF-IE-001',
    location: 'Wexford',
    timeWindow: {
      start: '2025-10-29T00:00:00Z',
      end: '2025-10-29T23:50:00Z',
    },
    volume: 1.0,
    currentBid: 45.50,
    minBid: 46.00,
    reserve: 40.00,
    auctionEnds: '2025-10-31T14:00:00Z',
    carbonIntensity: 12,
    renewableType: 'wind',
    status: 'On Auction',
    verificationBadges: ['ISO 50001', 'EU RED II', 'I-REC'],
    nftImage: 'wind-turbine',
    attributes: {
      'Grid Connection': 'IE - South East Grid',
      'Turbine Model': 'Vestas V164-9.5',
      'Nameplate Capacity': '9.5 MW',
      'Commission Date': 'Jan 2024',
    },
    slices: generateSlices('2025-10-29T00:00:00Z', 144, 6.5, 12),
    activities: [
      {
        type: 'Listed',
        timestamp: '2025-10-29T10:30:00Z',
        description: 'Listed for auction with reserve 40 USDC',
        signature: '5J7k...3Nm9',
        status: 'success',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T08:15:00Z',
        description: 'Bid placed by 0x7A...4B2C',
        signature: '8Ks2...9Lp1',
        status: 'success',
        amount: 42.00,
        user: '0x7A...4B2C',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T12:45:00Z',
        description: 'Bid placed by 0x9F...8D3E',
        signature: '2Mp4...7Qt6',
        status: 'success',
        amount: 45.50,
        user: '0x9F...8D3E',
      },
    ],
  },
  {
    id: 'go-002',
    generatorName: 'Kerry Solar Park',
    generatorId: 'SP-IE-002',
    location: 'Kerry',
    timeWindow: {
      start: '2025-10-28T06:00:00Z',
      end: '2025-10-28T17:50:00Z',
    },
    volume: 1.0,
    price: 38.00,
    carbonIntensity: 8,
    renewableType: 'solar',
    status: 'Buy Now',
    verificationBadges: ['TÜV SÜD', 'EU RED II'],
    nftImage: 'solar-panels',
    attributes: {
      'Grid Connection': 'IE - South West Grid',
      'Panel Type': 'Bifacial N-Type',
      'Nameplate Capacity': '25 MW',
      'Commission Date': 'Jun 2023',
    },
    slices: generateSlices('2025-10-28T06:00:00Z', 72, 13.8, 8),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-28T18:00:00Z',
        description: 'NFT minted on Solana',
        signature: '3Qr7...5Kl2',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-28T18:05:00Z',
        description: 'Listed at fixed price 38 USDC',
        signature: '6Yx9...2Bn4',
        status: 'success',
      },
    ],
  },
  {
    id: 'go-003',
    generatorName: 'Cork Offshore Wind',
    generatorId: 'WF-IE-003',
    location: 'Cork',
    timeWindow: {
      start: '2025-10-30T00:00:00Z',
      end: '2025-10-30T23:50:00Z',
    },
    volume: 1.0,
    currentBid: 52.25,
    minBid: 53.00,
    reserve: 48.00,
    auctionEnds: '2025-11-01T16:00:00Z',
    carbonIntensity: 10,
    renewableType: 'wind',
    status: 'On Auction',
    verificationBadges: ['REGO', 'ISO 14001', 'EU RED II'],
    nftImage: 'offshore-wind',
    attributes: {
      'Grid Connection': 'IE - South Grid',
      'Turbine Model': 'GE Haliade-X 14MW',
      'Nameplate Capacity': '14 MW',
      'Commission Date': 'Mar 2024',
    },
    slices: generateSlices('2025-10-30T00:00:00Z', 144, 11.2, 10),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-30T01:00:00Z',
        description: 'NFT minted on Solana',
        signature: '7Wp3...8Zt5',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-30T01:10:00Z',
        description: 'Listed for auction with reserve 48 USDC',
        signature: '9Lm6...4Hj1',
        status: 'success',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T09:20:00Z',
        description: 'Bid placed by 0x2C...7E9F',
        signature: '1Nq8...6Vr2',
        status: 'success',
        amount: 50.00,
        user: '0x2C...7E9F',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T11:05:00Z',
        description: 'Bid placed by 0x5D...1A4B',
        signature: '4Ks7...3Pm9',
        status: 'success',
        amount: 52.25,
        user: '0x5D...1A4B',
      },
    ],
  },
  {
    id: 'go-004',
    generatorName: 'Sligo Wind Park',
    generatorId: 'WF-IE-004',
    location: 'Sligo',
    timeWindow: {
      start: '2025-11-02T00:00:00Z',
      end: '2025-11-02T23:50:00Z',
    },
    volume: 1.0,
    carbonIntensity: 11,
    renewableType: 'wind',
    status: 'Soon',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'wind-farm',
    attributes: {
      'Grid Connection': 'IE - North West Grid',
      'Turbine Model': 'Siemens Gamesa SG 8.0-167',
      'Nameplate Capacity': '8 MW',
      'Commission Date': 'Sep 2023',
    },
    slices: generateSlices('2025-11-02T00:00:00Z', 144, 7.8, 11),
    activities: [],
  },
  {
    id: 'go-005',
    generatorName: 'Dublin Solar Array',
    generatorId: 'SP-IE-005',
    location: 'Dublin',
    timeWindow: {
      start: '2025-10-25T07:00:00Z',
      end: '2025-10-25T18:50:00Z',
    },
    volume: 1.0,
    price: 35.00,
    carbonIntensity: 7,
    renewableType: 'solar',
    status: 'Sold Out',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'solar-field',
    attributes: {
      'Grid Connection': 'IE - East Grid',
      'Panel Type': 'Monocrystalline PERC',
      'Nameplate Capacity': '50 MW',
      'Commission Date': 'Feb 2023',
    },
    slices: generateSlices('2025-10-25T07:00:00Z', 72, 18.5, 7),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-25T19:00:00Z',
        description: 'NFT minted on Solana',
        signature: '2Rt4...9Kp6',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-25T19:05:00Z',
        description: 'Listed at fixed price 35 USDC',
        signature: '8Vm2...5Ql3',
        status: 'success',
      },
      {
        type: 'Settled',
        timestamp: '2025-10-26T08:30:00Z',
        description: 'Purchased by 0x8A...3F7C',
        signature: '5Jn9...7Wp1',
        status: 'success',
        amount: 35.00,
        user: '0x8A...3F7C',
      },
    ],
  },
  {
    id: 'go-006',
    generatorName: 'Galway Wind Farm',
    generatorId: 'WF-IE-006',
    location: 'Galway',
    timeWindow: {
      start: '2025-10-29T00:00:00Z',
      end: '2025-10-29T23:50:00Z',
    },
    volume: 1.0,
    price: 42.00,
    carbonIntensity: 9,
    renewableType: 'wind',
    status: 'Buy Now',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'wind-turbine',
    attributes: {
      'Grid Connection': 'IE - West Grid',
      'Turbine Model': 'Vestas V150-5.6',
      'Nameplate Capacity': '5.6 MW',
      'Commission Date': 'May 2022',
    },
    slices: generateSlices('2025-10-29T00:00:00Z', 144, 10.4, 9),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-29T02:00:00Z',
        description: 'NFT minted on Solana',
        signature: '6Tk8...2Lm5',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-29T02:10:00Z',
        description: 'Listed at fixed price 42 USDC',
        signature: '3Pq7...9Rn4',
        status: 'success',
      },
    ],
  },
  {
    id: 'go-007',
    generatorName: 'Donegal Coastal Wind',
    generatorId: 'WF-IE-007',
    location: 'Donegal',
    timeWindow: {
      start: '2025-10-30T00:00:00Z',
      end: '2025-10-30T23:50:00Z',
    },
    volume: 1.0,
    currentBid: 41.00,
    minBid: 42.00,
    reserve: 38.00,
    auctionEnds: '2025-11-01T12:00:00Z',
    carbonIntensity: 11,
    renewableType: 'wind',
    status: 'On Auction',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'wind-turbine',
    attributes: {
      'Grid Connection': 'IE - North West Grid',
      'Turbine Model': 'Nordex N149-5.7',
      'Nameplate Capacity': '5.7 MW',
      'Commission Date': 'Aug 2023',
    },
    slices: generateSlices('2025-10-30T00:00:00Z', 144, 8.2, 11),
    activities: [
      {
        type: 'Listed',
        timestamp: '2025-10-30T06:00:00Z',
        description: 'Listed for auction with reserve 38 USDC',
        signature: '4Hx9...2Lp3',
        status: 'success',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T14:20:00Z',
        description: 'Bid placed by 0x3B...9C1D',
        signature: '7Ym4...5Qn8',
        status: 'success',
        amount: 41.00,
        user: '0x3B...9C1D',
      },
    ],
  },
  {
    id: 'go-008',
    generatorName: 'Limerick Solar Farm',
    generatorId: 'SP-IE-008',
    location: 'Limerick',
    timeWindow: {
      start: '2025-10-29T06:00:00Z',
      end: '2025-10-29T17:50:00Z',
    },
    volume: 1.0,
    price: 36.50,
    carbonIntensity: 8,
    renewableType: 'solar',
    status: 'Buy Now',
    verificationBadges: ['TÜV SÜD', 'EU RED II'],
    nftImage: 'solar-panels',
    attributes: {
      'Grid Connection': 'IE - Mid West Grid',
      'Panel Type': 'Heterojunction',
      'Nameplate Capacity': '18 MW',
      'Commission Date': 'Apr 2024',
    },
    slices: generateSlices('2025-10-29T06:00:00Z', 72, 12.5, 8),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-29T18:30:00Z',
        description: 'NFT minted on Solana',
        signature: '9Kp2...6Wt7',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-29T18:35:00Z',
        description: 'Listed at fixed price 36.50 USDC',
        signature: '1Zq5...3Hn9',
        status: 'success',
      },
    ],
  },
  {
    id: 'go-009',
    generatorName: 'Waterford Wind Station',
    generatorId: 'WF-IE-009',
    location: 'Waterford',
    timeWindow: {
      start: '2025-10-31T00:00:00Z',
      end: '2025-10-31T23:50:00Z',
    },
    volume: 1.0,
    carbonIntensity: 10,
    renewableType: 'wind',
    status: 'Soon',
    verificationBadges: ['ISO 50001', 'EU RED II', 'I-REC'],
    nftImage: 'wind-farm',
    attributes: {
      'Grid Connection': 'IE - South East Grid',
      'Turbine Model': 'Enercon E-126',
      'Nameplate Capacity': '7.5 MW',
      'Commission Date': 'Nov 2023',
    },
    slices: generateSlices('2025-10-31T00:00:00Z', 144, 9.1, 10),
    activities: [],
  },
  {
    id: 'go-010',
    generatorName: 'Wicklow Mountain Wind',
    generatorId: 'WF-IE-010',
    location: 'Wicklow',
    timeWindow: {
      start: '2025-10-28T00:00:00Z',
      end: '2025-10-28T23:50:00Z',
    },
    volume: 1.0,
    price: 44.00,
    carbonIntensity: 9,
    renewableType: 'wind',
    status: 'Buy Now',
    verificationBadges: ['ISO 14001', 'EU RED II'],
    nftImage: 'wind-turbine',
    attributes: {
      'Grid Connection': 'IE - East Grid',
      'Turbine Model': 'Vestas V136-4.2',
      'Nameplate Capacity': '4.2 MW',
      'Commission Date': 'Jan 2023',
    },
    slices: generateSlices('2025-10-28T00:00:00Z', 144, 11.6, 9),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-28T03:00:00Z',
        description: 'NFT minted on Solana',
        signature: '5Bm7...4Jp2',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-28T03:15:00Z',
        description: 'Listed at fixed price 44 USDC',
        signature: '8Nq1...7Ks6',
        status: 'success',
      },
    ],
  },
  {
    id: 'go-011',
    generatorName: 'Meath Solar Park',
    generatorId: 'SP-IE-011',
    location: 'Meath',
    timeWindow: {
      start: '2025-10-30T07:00:00Z',
      end: '2025-10-30T18:50:00Z',
    },
    volume: 1.0,
    currentBid: 33.50,
    minBid: 34.00,
    reserve: 32.00,
    auctionEnds: '2025-11-01T10:00:00Z',
    carbonIntensity: 7,
    renewableType: 'solar',
    status: 'On Auction',
    verificationBadges: ['TÜV SÜD', 'EU RED II'],
    nftImage: 'solar-field',
    attributes: {
      'Grid Connection': 'IE - East Grid',
      'Panel Type': 'TOPCon Bifacial',
      'Nameplate Capacity': '30 MW',
      'Commission Date': 'Jul 2024',
    },
    slices: generateSlices('2025-10-30T07:00:00Z', 72, 15.2, 7),
    activities: [
      {
        type: 'Listed',
        timestamp: '2025-10-30T07:30:00Z',
        description: 'Listed for auction with reserve 32 USDC',
        signature: '2Ln8...9Pm4',
        status: 'success',
      },
      {
        type: 'Bid Placed',
        timestamp: '2025-10-30T13:45:00Z',
        description: 'Bid placed by 0x4E...6F2A',
        signature: '6Kq3...1Wr5',
        status: 'success',
        amount: 33.50,
        user: '0x4E...6F2A',
      },
    ],
  },
  {
    id: 'go-012',
    generatorName: 'Clare Coastal Wind',
    generatorId: 'WF-IE-012',
    location: 'Clare',
    timeWindow: {
      start: '2025-10-29T00:00:00Z',
      end: '2025-10-29T23:50:00Z',
    },
    volume: 1.0,
    price: 40.00,
    carbonIntensity: 10,
    renewableType: 'wind',
    status: 'Buy Now',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'offshore-wind',
    attributes: {
      'Grid Connection': 'IE - Mid West Grid',
      'Turbine Model': 'Siemens Gamesa SG 6.0-155',
      'Nameplate Capacity': '6 MW',
      'Commission Date': 'Dec 2022',
    },
    slices: generateSlices('2025-10-29T00:00:00Z', 144, 8.8, 10),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-29T01:20:00Z',
        description: 'NFT minted on Solana',
        signature: '3Vp6...8Zn2',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-29T01:30:00Z',
        description: 'Listed at fixed price 40 USDC',
        signature: '7Hm4...5Qp9',
        status: 'success',
      },
    ],
  },
  {
    id: 'go-013',
    generatorName: 'Tipperary Solar Station',
    generatorId: 'SP-IE-013',
    location: 'Tipperary',
    timeWindow: {
      start: '2025-10-27T06:00:00Z',
      end: '2025-10-27T17:50:00Z',
    },
    volume: 1.0,
    price: 37.50,
    carbonIntensity: 8,
    renewableType: 'solar',
    status: 'Sold Out',
    verificationBadges: ['ISO 50001', 'EU RED II'],
    nftImage: 'solar-panels',
    attributes: {
      'Grid Connection': 'IE - South Grid',
      'Panel Type': 'Monocrystalline PERC',
      'Nameplate Capacity': '22 MW',
      'Commission Date': 'Mar 2024',
    },
    slices: generateSlices('2025-10-27T06:00:00Z', 72, 14.1, 8),
    activities: [
      {
        type: 'Minted',
        timestamp: '2025-10-27T18:10:00Z',
        description: 'NFT minted on Solana',
        signature: '9Wt3...2Bn7',
        status: 'success',
      },
      {
        type: 'Listed',
        timestamp: '2025-10-27T18:20:00Z',
        description: 'Listed at fixed price 37.50 USDC',
        signature: '4Km9...6Lp1',
        status: 'success',
      },
      {
        type: 'Settled',
        timestamp: '2025-10-28T11:15:00Z',
        description: 'Purchased by 0x6C...2D8E',
        signature: '1Rq7...9Hn3',
        status: 'success',
        amount: 37.50,
        user: '0x6C...2D8E',
      },
    ],
  },
  {
    id: 'go-014',
    generatorName: 'Louth Wind Park',
    generatorId: 'WF-IE-014',
    location: 'Louth',
    timeWindow: {
      start: '2025-11-01T00:00:00Z',
      end: '2025-11-01T23:50:00Z',
    },
    volume: 1.0,
    carbonIntensity: 11,
    renewableType: 'wind',
    status: 'Soon',
    verificationBadges: ['ISO 14001', 'EU RED II'],
    nftImage: 'wind-farm',
    attributes: {
      'Grid Connection': 'IE - North East Grid',
      'Turbine Model': 'GE Cypress 5.3-158',
      'Nameplate Capacity': '5.3 MW',
      'Commission Date': 'Oct 2023',
    },
    slices: generateSlices('2025-11-01T00:00:00Z', 144, 7.5, 11),
    activities: [],
  },
];

function generateSlices(startTime: string, count: number, avgKWh: number, avgCo2: number): Slice[] {
  const slices: Slice[] = [];
  const start = new Date(startTime);
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(start.getTime() + i * 10 * 60 * 1000);
    const variance = 0.8 + Math.random() * 0.4; // 80% to 120% of average
    slices.push({
      timestamp: timestamp.toISOString(),
      kWh: Number((avgKWh * variance).toFixed(2)),
      co2e: Number((avgCo2 * variance).toFixed(2)),
      sourceStatus: Math.random() > 0.05 ? 'verified' : 'pending',
      onChainStatus: i < count - 10 ? 'minted' : Math.random() > 0.3 ? 'pending' : 'none',
    });
  }
  
  return slices;
}

export const mockGeneratorStats: GeneratorStats = {
  livePower: 8.7,
  lastSliceTimestamp: '2025-10-30T14:40:00Z',
  slicesInBucket: 87,
  accruedVolume: 0.87,
  mintableUnits: 0,
  lifetimeMinted: 248,
};

export const mockGenerationData = Array.from({ length: 144 }, (_, i) => {
  const baseTime = new Date('2025-10-30T00:00:00Z');
  const time = new Date(baseTime.getTime() + i * 10 * 60 * 1000);
  const hour = time.getUTCHours();
  
  // Simulate wind pattern with some variation
  let base = 6.5;
  if (hour >= 0 && hour < 6) base = 7.2;
  if (hour >= 6 && hour < 12) base = 5.8;
  if (hour >= 12 && hour < 18) base = 6.9;
  if (hour >= 18 && hour < 24) base = 7.5;
  
  const variance = 0.85 + Math.random() * 0.3;
  
  return {
    timestamp: time.toISOString(),
    kWh: Number((base * variance).toFixed(2)),
    formatted: `${String(time.getUTCHours()).padStart(2, '0')}:${String(time.getUTCMinutes()).padStart(2, '0')}`,
  };
});

export const mockBids: Bid[] = [
  {
    id: 'bid-001',
    goId: 'go-001',
    goName: 'Wexford Wind Farm • Oct 29, 2025',
    amount: 45.50,
    timestamp: '2025-10-30T12:45:00Z',
    status: 'leading',
    endsAt: '2025-10-31T14:00:00Z',
  },
  {
    id: 'bid-002',
    goId: 'go-007',
    goName: 'Donegal Coastal Wind • Oct 30, 2025',
    amount: 39.00,
    timestamp: '2025-10-29T16:20:00Z',
    status: 'outbid',
    endsAt: '2025-10-30T18:00:00Z',
  },
];

export const mockOwnedGOs: GOCertificate[] = [
  mockGOCertificates[4], // Dublin Solar Array - Sold out
  mockGOCertificates[12], // Tipperary Solar Station - Sold out
];

export const mockActivityFeed: Activity[] = [
  {
    type: 'Bid Placed',
    timestamp: '2025-10-30T12:45:00Z',
    description: 'You placed a bid of 45.50 USDC on Wexford Wind Farm',
    signature: '2Mp4...7Qt6',
    status: 'success',
    amount: 45.50,
  },
  {
    type: 'Listed',
    timestamp: '2025-10-30T10:30:00Z',
    description: 'Wexford Wind Farm listed for auction',
    signature: '5J7k...3Nm9',
    status: 'success',
  },
  {
    type: 'Settled',
    timestamp: '2025-10-26T08:30:00Z',
    description: 'You purchased Dublin Solar Array for 35 USDC',
    signature: '5Jn9...7Wp1',
    status: 'success',
    amount: 35.00,
  },
  {
    type: 'Outbid',
    timestamp: '2025-10-29T18:15:00Z',
    description: 'You were outbid on Donegal Coastal Wind',
    status: 'pending',
  },
  {
    type: 'Minted',
    timestamp: '2025-10-29T02:00:00Z',
    description: 'Galway Wind Farm minted 1 MWh certificate',
    signature: '6Tk8...2Lm5',
    status: 'success',
  },
];
