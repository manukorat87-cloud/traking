import React from 'react';
import { ShieldAlert, SearchX, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface TrackingNotFoundProps {
  isDisabled?: boolean;
  message?: string;
}

export const TrackingNotFound: React.FC<TrackingNotFoundProps> = ({
  isDisabled = false,
  message,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shadow-inner">
          {isDisabled ? <ShieldAlert className="h-8 w-8" /> : <SearchX className="h-8 w-8" />}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {isDisabled ? 'Order Tracking Unavailable' : 'Tracking Link Not Found'}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {message ||
              (isDisabled
                ? 'Order tracking is currently unavailable. Please contact customer support for further details.'
                : 'Please check your tracking link and try again.')}
          </p>
        </div>

        <div className="pt-2">
          <a href="/">
            <Button variant="outline" size="md" className="w-full">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Store</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
