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
import { Alert, AlertDescription } from "./ui/alert";
import { Info, CheckCircle2, Loader2 } from "lucide-react";
import { formatCurrency } from "../lib/utils";

interface BuyNowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goName: string;
  price: number;
  onSuccess: () => void;
}

export function BuyNowModal({ 
  open, 
  onOpenChange, 
  goName,
  price,
  onSuccess 
}: BuyNowModalProps) {
  const [step, setStep] = useState<'confirm' | 'approving' | 'success'>('confirm');

  const userBalance = 1250.50;
  const platformFee = 0.5;
  const networkFee = 0.000005;
  
  const feeAmount = price * (platformFee / 100);
  const total = price + feeAmount;

  const handleBuy = () => {
    setStep('approving');
    
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        onOpenChange(false);
        setTimeout(() => setStep('confirm'), 300);
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    if (step !== 'approving') {
      onOpenChange(false);
      setTimeout(() => setStep('confirm'), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'confirm' && 'Buy GO Certificate'}
            {step === 'approving' && 'Approve in Wallet'}
            {step === 'success' && 'Purchase Successful'}
          </DialogTitle>
          <DialogDescription className="line-clamp-1">
            {goName}
          </DialogDescription>
        </DialogHeader>

        {step === 'confirm' && (
          <>
            <div className="space-y-4 py-4">
              {/* Price Breakdown */}
              <div className="space-y-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price</span>
                  <span className="text-gray-900">{formatCurrency(price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Platform Fee (0.5%)</span>
                  <span className="text-gray-900">{formatCurrency(feeAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network Fee</span>
                  <span className="text-gray-900">~{networkFee} SOL</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-300">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Balance */}
              <div className="flex justify-between text-sm p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-emerald-800">Available Balance</span>
                <span className="text-emerald-900">{formatCurrency(userBalance)}</span>
              </div>

              {/* Info */}
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This GO certificate will be transferred to your wallet immediately after purchase.
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleBuy}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Confirm Purchase
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'approving' && (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
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
                <div className="text-gray-900 mb-2">Purchase Successful!</div>
                <div className="text-sm text-gray-600">
                  GO certificate has been transferred to your wallet
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
