import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

interface TrackingNotFoundProps {
  searchedOrderNumber?: string;
  onTryAgain?: () => void;
  isDisabled?: boolean;
  message?: string;
}

export const TrackingNotFound: React.FC<TrackingNotFoundProps> = ({
  searchedOrderNumber,
  onTryAgain,
  isDisabled = false,
  message,
}) => {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg mx-auto text-center border border-amber-950/10 shadow-lg space-y-6">
      <div className="mx-auto h-16 w-16 rounded-2xl bg-amber-50 text-vastriya-800 border border-amber-200/80 flex items-center justify-center shadow-inner">
        <SearchX className="h-8 w-8 text-vastriya-800" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
          {isDisabled ? 'Order Tracking Unavailable' : 'Order Not Found'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          {message ||
            (searchedOrderNumber
              ? `We couldn't find an order with "${searchedOrderNumber}". Please check your order number and try again.`
              : "We couldn't find an order with this number. Please check your order number and try again.")}
        </p>
      </div>

      {/* Helpful Hint */}
      <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/60 text-xs text-amber-900/90 space-y-1">
        <p className="font-semibold">Sample Order Numbers to try:</p>
        <p className="font-mono text-vastriya-900 font-bold">VAS123456 • VAS123457 • VAS123458 • VAS123459</p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onTryAgain}
          className="w-full px-6 py-3.5 bg-vastriya-900 hover:bg-vastriya-950 text-gold-200 font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};
