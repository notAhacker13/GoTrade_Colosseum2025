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
import { Textarea } from "./ui/textarea";
import { CheckCircle2, Loader2, Download } from "lucide-react";

interface RedemptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goName: string;
  onSuccess: () => void;
}

export function RedemptionModal({ 
  open, 
  onOpenChange, 
  goName,
  onSuccess 
}: RedemptionModalProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'complete'>('form');
  const [formData, setFormData] = useState({
    company: '',
    purpose: '',
    scope2Note: '',
  });

  const handleRedeem = () => {
    setStep('processing');
    
    setTimeout(() => {
      setStep('complete');
    }, 2000);
  };

  const handleDownload = () => {
    // Simulate PDF download
    console.log('Downloading redemption receipt...');
  };

  const handleClose = () => {
    if (step !== 'processing') {
      onOpenChange(false);
      setTimeout(() => {
        setStep('form');
        setFormData({ company: '', purpose: '', scope2Note: '' });
      }, 300);
    }
  };

  const handleFinish = () => {
    onSuccess();
    onOpenChange(false);
    setTimeout(() => {
      setStep('form');
      setFormData({ company: '', purpose: '', scope2Note: '' });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {step === 'form' && 'Redeem GO Certificate'}
            {step === 'processing' && 'Processing Redemption'}
            {step === 'complete' && 'Redemption Complete'}
          </DialogTitle>
          <DialogDescription className="line-clamp-1">
            {goName}
          </DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <>
            <div className="space-y-4 py-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm text-amber-900 mb-1">⚠️ Important</div>
                <div className="text-xs text-amber-800">
                  Redeeming this certificate will permanently retire it for environmental claims. This action cannot be undone.
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Acme Corporation"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Redemption *</Label>
                <Textarea
                  id="purpose"
                  placeholder="e.g., Scope 2 emissions offsetting for Q4 2025"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scope2">Scope 2 Reporting Note (Optional)</Label>
                <Textarea
                  id="scope2"
                  placeholder="Additional notes for carbon accounting"
                  value={formData.scope2Note}
                  onChange={(e) => setFormData({ ...formData, scope2Note: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-900 mb-1">📄 Receipt</div>
                <div className="text-xs text-blue-800">
                  You will receive a PDF redemption certificate with all details and on-chain proof.
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleRedeem}
                className="bg-emerald-600 hover:bg-emerald-700"
                disabled={!formData.company || !formData.purpose}
              >
                Confirm Redemption
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'processing' && (
          <div className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-2">Processing Redemption</div>
                <div className="text-sm text-gray-600">
                  Retiring certificate on-chain and generating receipt...
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'complete' && (
          <>
            <div className="py-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="text-center">
                  <div className="text-gray-900 mb-2">Certificate Redeemed Successfully!</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Your GO certificate has been permanently retired
                  </div>
                </div>

                {/* Receipt Preview */}
                <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-900 mb-3">Redemption Receipt</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate:</span>
                      <span className="text-gray-900">{goName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="text-gray-900">{formData.company}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Redeemed:</span>
                      <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TX Hash:</span>
                      <span className="text-gray-900 font-mono">9Km4...7Pq2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF Receipt
              </Button>
              <Button 
                onClick={handleFinish}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
