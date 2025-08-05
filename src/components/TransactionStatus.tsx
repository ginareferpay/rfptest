import { AlertCircle, CheckCircle, Clock, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TransactionStatus as TransactionStatusType } from "@/hooks/useWeb3";

interface TransactionStatusProps {
  transactionStatus: TransactionStatusType;
  onDismiss?: () => void;
}

export const TransactionStatus = ({ transactionStatus, onDismiss }: TransactionStatusProps) => {
  const { status, step, hash, error } = transactionStatus;

  if (status === 'idle') return null;

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getVariant = () => {
    switch (status) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const polygonScanUrl = hash ? `https://polygonscan.com/tx/${hash}` : null;

  return (
    <Alert variant={getVariant()} className="mb-4">
      {getStatusIcon()}
      <AlertTitle className="flex items-center justify-between">
        <span>
          {status === 'pending' && 'Transaction in Progress'}
          {status === 'success' && 'Transaction Successful'}
          {status === 'error' && 'Transaction Failed'}
        </span>
        {onDismiss && status !== 'pending' && (
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss
          </Button>
        )}
      </AlertTitle>
      <AlertDescription className="space-y-2">
        <div>{error || step}</div>
        {hash && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Transaction Hash:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">{hash.slice(0, 10)}...{hash.slice(-8)}</code>
            {polygonScanUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-1"
                onClick={() => window.open(polygonScanUrl, '_blank')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};