import React from 'react';
import { Truck, Calendar, MapPin } from 'lucide-react';

interface CurrentStatusCardProps {
  currentStatusLabel: string;
  currentLocation?: string;
  estimatedDelivery: string;
  isDelivered: boolean;
}

export const CurrentStatusCard: React.FC<CurrentStatusCardProps> = ({
  currentStatusLabel,
  currentLocation,
  estimatedDelivery,
  isDelivered,
}) => {
  return (
    <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-brand-900/20 relative overflow-hidden">
      {/* Decorative Glow Background */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-brand-500/20 text-brand-200 border border-brand-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Current Status</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {currentStatusLabel}
          </h2>

          {currentLocation && (
            <div className="flex items-center space-x-2 text-brand-200 text-xs sm:text-sm">
              <MapPin className="h-4 w-4 text-brand-400 shrink-0" />
              <span>{currentLocation}</span>
            </div>
          )}
        </div>

        {/* Expected Delivery Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shrink-0">
          <div className="p-3 bg-brand-500 text-white rounded-xl shadow-md">
            {isDelivered ? <Truck className="h-6 w-6" /> : <Calendar className="h-6 w-6" />}
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-200 block">
              {isDelivered ? 'Delivered On' : 'Expected Delivery'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white tracking-wide">
              {estimatedDelivery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
