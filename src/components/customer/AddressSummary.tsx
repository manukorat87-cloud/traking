import React from 'react';
import { MapPin, User, Tag } from 'lucide-react';

interface AddressSummaryProps {
  customerName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  totalAmount: string;
}

export const AddressSummary: React.FC<AddressSummaryProps> = ({
  customerName,
  address,
  city,
  state,
  pin,
  totalAmount,
}) => {
  const formattedAmount = (() => {
    const num = parseFloat(totalAmount);
    if (isNaN(num)) return `₹${totalAmount}`;
    return `₹${num.toLocaleString('en-IN')}`;
  })();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Delivery Address */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <MapPin className="h-4 w-4 text-brand-600" />
            <span>Delivering To</span>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <User className="h-4 w-4 text-slate-400" />
              <span>{customerName}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
              {address}
            </p>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-1">
              {city}, {state} - {pin}
            </p>
          </div>
        </div>
      </div>

      {/* Order Total Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Tag className="h-4 w-4 text-brand-600" />
            <span>Order Summary</span>
          </div>

          <div>
            <span className="text-xs text-slate-500 block">Total Paid</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {formattedAmount}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Payment Status</span>
          <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            Confirmed & Verified
          </span>
        </div>
      </div>
    </div>
  );
};
