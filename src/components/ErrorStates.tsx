import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, RefreshCw, Wifi, Server, ShieldAlert } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  type?: 'network' | 'server' | 'permission' | 'general';
  className?: string;
}

export function ErrorState({ 
  title = "Something went wrong",
  message = "We encountered an error while loading this data.",
  onRetry,
  type = 'general',
  className = ""
}: ErrorStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <Wifi className="w-8 h-8 text-red-500" />;
      case 'server':
        return <Server className="w-8 h-8 text-red-500" />;
      case 'permission':
        return <ShieldAlert className="w-8 h-8 text-red-500" />;
      default:
        return <AlertCircle className="w-8 h-8 text-red-500" />;
    }
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
        {getIcon()}
      </div>
      <h3 className="text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

// Specific error states
export function NetworkErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      type="network"
      title="Connection error"
      message="Unable to connect to the network. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

export function ServerErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      type="server"
      title="Server error"
      message="Our servers are experiencing issues. Please try again in a few moments."
      onRetry={onRetry}
    />
  );
}

export function LoadErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      title="Failed to load data"
      message="We couldn't load the requested data. Please try again."
      onRetry={onRetry}
    />
  );
}

export function InlineErrorAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

export function ErrorCard({ 
  title, 
  message, 
  onRetry 
}: { 
  title: string; 
  message: string; 
  onRetry?: () => void; 
}) {
  return (
    <Card className="p-12">
      <ErrorState
        title={title}
        message={message}
        onRetry={onRetry}
      />
    </Card>
  );
}

// Table error state
export function TableErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <tr>
      <td colSpan={100} className="p-8">
        <ErrorState
          title="Failed to load table data"
          message="There was a problem loading the data. Please try again."
          onRetry={onRetry}
        />
      </td>
    </tr>
  );
}
