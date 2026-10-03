import React from 'react';
import { PublicOrderTracking } from '../../types';
import { Calendar, Tag, CheckCircle2, Clock, ShoppingBag } from 'lucide-react';

interface OrderSummaryCardProps {
  data: PublicOrderTracking;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ data }) => {
  const price = data.product?.price ?? 1999;
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-950/10 shadow-sm relative overflow-hidden">
      {/* Decorative Gold Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vastriya-900 via-gold-500 to-vastriya-900" />

      {/* Top Banner Row: Order # & Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-semibold text-amber-900/60 block">
            Vastriya Order Summary
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-center space-x-2 mt-0.5">
            <span>Order #{data.orderNumber || data.orderId || 'VAS123456'}</span>
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">Current Status:</span>
          <span className="inline-flex items-center space-x-1.5 bg-vastriya-900 text-gold-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-gold-500/30 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span>{data.currentStatusLabel || 'ORDER PLACED'}</span>
          </span>
        </div>
      </div>

      {/* Main Grid Content: Desktop 2 Columns / Mobile Vertical Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Left Column: Dates & Payment */}
        <div className="space-y-4">
          <div className="bg-[#fcfbfa] rounded-2xl p-4 border border-amber-900/5 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500 flex items-center space-x-1.5 font-medium">
                <Calendar className="h-4 w-4 text-vastriya-700" />
                <span>Order Date:</span>
              </span>
              <span className="font-semibold text-slate-900">{data.orderDate || '3 Oct 2026'}</span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-slate-100">
              <span className="text-slate-500 flex items-center space-x-1.5 font-medium">
                <Clock className="h-4 w-4 text-gold-600" />
                <span>Estimated Delivery:</span>
              </span>
              <span className="font-bold text-vastriya-900">{data.estimatedDelivery || '10 Oct 2026'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-emerald-50/60 rounded-2xl px-4 py-3 border border-emerald-100 text-xs sm:text-sm">
            <span className="text-slate-600 font-medium flex items-center space-x-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Payment ({data.payment?.method || 'UPI'}):</span>
            </span>
            <span className="font-bold text-emerald-700 uppercase tracking-wide">
              {data.payment?.status || 'PAID'}
            </span>
          </div>
        </div>

        {/* Right Column: Product Info & Total */}
        <div className="bg-[#fcfbfa] rounded-2xl p-4 border border-amber-900/5 flex flex-col justify-between">
          <div className="flex items-start space-x-3.5">
            <div className="h-14 w-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
              <img
                src={data.product?.image || '/ghaghra_choli.png'}
                alt={data.product?.name || 'Ghaghra Choli'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-vastriya-800 bg-vastriya-50 px-2 py-0.5 rounded border border-vastriya-100">
                {data.product?.category || 'Ethnic Wear'}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                {data.product?.name || 'Premium Ghaghra Choli'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Size: <span className="font-semibold text-slate-700">{data.product?.size || 'L'}</span> | Qty:{' '}
                <span className="font-semibold text-slate-700">{data.product?.quantity ?? 1}</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200/80 mt-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center space-x-1">
              <Tag className="h-3.5 w-3.5 text-slate-400" />
              <span>Total Price:</span>
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
