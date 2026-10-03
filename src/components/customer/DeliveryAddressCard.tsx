import React from 'react';
import { CustomerData } from '../../types';
import { MapPin, User, Phone } from 'lucide-react';

interface DeliveryAddressCardProps {
  customer: CustomerData;
}

export const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({ customer }) => {
  const name = customer?.name || 'Meet Sheladiya';
  const line1 = customer?.address?.line1 || '123 Example Street';
  const city = customer?.address?.city || 'Surat';
  const state = customer?.address?.state || 'Gujarat';
  const pincode = customer?.address?.pincode || '395001';
  const phone = customer?.phone || '+91 XXXXX XXXXX';

  return (
    <div className="bg-white rounded-3xl p-6 border border-amber-950/10 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-vastriya-900 border-b border-slate-100 pb-3">
          <MapPin className="h-4 w-4 text-vastriya-700" />
          <span>Delivery Address</span>
        </div>

        {/* Customer & Address Details */}
        <div className="space-y-2 text-slate-800">
          <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm sm:text-base">
            <User className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{name}</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-600 pl-6 leading-relaxed font-medium break-words">
            <p>{line1}</p>
            <p className="font-semibold text-slate-900 mt-0.5">
              {city}, {state} - {pincode}
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 pl-6 pt-1 font-medium">
            <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
