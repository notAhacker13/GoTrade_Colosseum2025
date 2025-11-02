import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Info, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { formatCurrency } from "../lib/utils";

interface PlaceBidModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goName: string;
  currentBid: number;
  minBid: number;
  onSuccess: () => void;
}

export function PlaceBidModal({ 
  open, 
  onOpenChange, 
  goName,
  currentBid,
  minBid,
  onSuccess 
}: PlaceBidModalProps) {
  const [bidAmount, setBidAmount] = useState(minBid.toFixed(2));
  const [step, setStep] = useState<'input' | 'approving' | 'success'>('input');
  const [error, setError] = useState('');

  const userBalance = 1250.50; // Mock balance
  const platformFee = 0.5; // 0.5%
  const networkFee = 0.000005; // SOL
  
  const bidValue = parseFloat(bidAmount) || 0;
  const feeAmount = bidValue * (platformFee / 100);
  const total = bidValue + feeAmount;

  const handleBid = () => {
    setError('');
    
    if (bidValue < minBid) {
      setError(`Minimum bid is ${formatCurrency(minBid)}`);
      return;
    }
    
    if (total > userBalance) {
      setError('Insufficient USDC balance');
      return;
    }

    // Simulate wallet approval
    setStep('approving');
    
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onOpenChange(false);
        // Reset for next time
        setTimeout(() => {
          setStep('input');
          setBidAmount(minBid.toFixed(2));
        }, 300);
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (step !== 'approving') {
      onOpenChange(false);
      setTimeout(() => {
        setStep('input');
        setError('');
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'input' && 'Place Bid'}
            {step === 'approving' && 'Approve in Wallet'}
            {step === 'success' && 'Bid Placed Successfully'}
          </DialogTitle>
          <DialogDescription className="line-clamp-1">
            {goName}
          </DialogDescription>
        </DialogHeader>

        {step === 'input' && (
          <>
            <div className="space-y-4 py-4">
              {/* Current Bid Info */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Current Bid</span>
                  <span className="text-gray-900">{formatCurrency(currentBid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Minimum Next Bid</span>
                  <span className="text-gray-900">{formatCurrency(minBid)}</span>
                </div>
              </div>

              {/* Bid Input */}
              <div className="space-y-2">
                <Label htmlFor="bid-amount">Your Bid Amount</Label>
                <div className="relative">
                  <Input
                    id="bid-amount"
                    type="number"
                    step="0.01"
                    min={minBid}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    USDC
                  </div>
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="space-y-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">Fee Breakdown</div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-blue-800">
                    <span>Bid Amount</span>
                    <span>{formatCurrency(bidValue)}</span>
                  </div>
                  <div className="flex justify-between text-blue-800">
                    <span>Platform Fee (0.5%)</span>
                    <span>{formatCurrency(feeAmount)}</span>
                  </div>
                  <div className="flex justify-between text-blue-800">
                    <span>Network Fee</span>
                    <span>~{networkFee} SOL</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-300 pt-1 mt-1">
                    <span className="text-blue-900">Total</span>
                    <span className="text-blue-900">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available Balance</span>
                <span className="text-gray-900">{formatCurrency(userBalance)}</span>
              </div>

              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleBid}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Place Bid
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'approving' && (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-2">Approve Transaction in Wallet</div>
                <div className="text-sm text-gray-600">
                  Please approve the transaction in your connected wallet
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-2">Bid Placed Successfully!</div>
                <div className="text-sm text-gray-600">
                  Your bid of {formatCurrency(bidValue)} has been submitted
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
