import React, { useState } from 'react';
import { Search, PackageCheck } from 'lucide-react';

interface TrackingSearchProps {
  onSearch: (orderNum: string) => void;
  initialOrderNumber?: string;
  isLoading?: boolean;
}

export const TrackingSearch: React.FC<TrackingSearchProps> = ({
  onSearch,
  initialOrderNumber = '',
  isLoading = false,
}) => {
  const [inputVal, setInputVal] = useState(initialOrderNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleDemoClick = (num: string) => {
    setInputVal(num);
    onSearch(num);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-950/10 shadow-sm text-center space-y-6 max-w-3xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 text-vastriya-900 bg-vastriya-50 px-3.5 py-1 rounded-full border border-vastriya-100 text-xs font-semibold uppercase tracking-wider">
          <PackageCheck className="h-3.5 w-3.5 text-vastriya-700" />
          <span>Courier & Order Tracking</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
          Track Your Order
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Enter your order number to view your latest delivery status.
        </p>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Enter Order Number (e.g. VAS123456)"
            className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-vastriya-900 focus:border-vastriya-900 transition-all font-medium"
            required
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-7 py-3.5 bg-vastriya-900 hover:bg-vastriya-950 text-gold-200 font-semibold text-sm rounded-xl shadow-md shadow-vastriya-900/20 hover:shadow-lg transition-all duration-200 shrink-0 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-gold-200" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Tracking...</span>
            </>
          ) : (
            <span>Track Order</span>
          )}
        </button>
      </form>
    </div>
  );
};
