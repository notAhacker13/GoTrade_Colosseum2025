import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: string = 'USDC'): string {
  return `${value.toFixed(2)} ${currency}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export function formatTimeUTC(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().substring(11, 16) + ' UTC';
}

export function getTimeRemaining(endDate: string): string {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function shortenSignature(sig: string, start: number = 4, end: number = 4): string {
  if (sig.length <= start + end) return sig;
  return `${sig.substring(0, start)}...${sig.substring(sig.length - end)}`;
}

export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    'success': 'text-emerald-700 bg-emerald-50 border-emerald-200',
    'pending': 'text-amber-700 bg-amber-50 border-amber-200',
    'failed': 'text-red-700 bg-red-50 border-red-200',
    'info': 'text-blue-700 bg-blue-50 border-blue-200',
    'verified': 'text-emerald-700 bg-emerald-50 border-emerald-200',
    'minted': 'text-indigo-700 bg-indigo-50 border-indigo-200',
    'none': 'text-gray-600 bg-gray-50 border-gray-200',
  };
  
  return statusMap[status.toLowerCase()] || statusMap['info'];
}
