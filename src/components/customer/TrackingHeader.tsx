import React from 'react';
import { PackageCheck } from 'lucide-react';

interface TrackingHeaderProps {
  brandName?: string;
  brandLogo?: string;
  orderId: string;
  orderDate: string;
}

export const TrackingHeader: React.FC<TrackingHeaderProps> = ({
  brandName = 'Shopify Store',
  brandLogo,
  orderId,
  orderDate,
}) => {
  const formattedDate = (() => {
    try {
      const d = new Date(orderDate);
      return d.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch (e) {
      return orderDate;
    }
  })();

  return (
    <header className="bg-white border-b border-slate-200/80 shadow-xs py-6 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-2.5">
          {brandLogo ? (
            <img src={brandLogo} alt={brandName} className="h-8 w-auto max-w-[140px] object-contain" />
          ) : (
            <div className="h-10 w-10 bg-brand-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20">
              <PackageCheck className="h-6 w-6" />
            </div>
          )}
          <span className="text-xl font-extrabold tracking-tight text-slate-900">{brandName}</span>
        </div>

        {/* Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Track Your Order</h1>
          <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
            Real-time order progress
          </p>
        </div>

        {/* Order Identifier pill */}
        <div className="inline-flex items-center space-x-4 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-700">
          <div>
            <span className="text-slate-400 font-normal mr-1">Order:</span>
            <span className="font-mono font-bold text-slate-900">#{orderId}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-400 font-normal mr-1">Placed on:</span>
            <span className="font-semibold text-slate-800">{formattedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
