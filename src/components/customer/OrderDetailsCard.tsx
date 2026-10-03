import React from 'react';
import { ProductData, PaymentData } from '../../types';
import { ShoppingBag, CreditCard, Check } from 'lucide-react';

interface OrderDetailsCardProps {
  product: ProductData;
  payment: PaymentData;
}

export const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({ product, payment }) => {
  const price = product?.price ?? 1999;
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white rounded-3xl p-6 border border-amber-950/10 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-vastriya-900 border-b border-slate-100 pb-3">
          <ShoppingBag className="h-4 w-4 text-vastriya-700" />
          <span>Order Details</span>
        </div>

        {/* Product Information */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
            <img
              src={product?.image || '/ghaghra_choli.png'}
              alt={product?.name || 'Ghaghra Choli'}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
              {product?.category || 'Ethnic Wear'}
            </span>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
              {product?.name || 'Premium Ghaghra Choli'}
            </h4>
            <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1 font-medium">
              <span>Size: <strong className="text-slate-700">{product?.size || 'L'}</strong></span>
              <span>•</span>
              <span>Qty: <strong className="text-slate-700">{product?.quantity ?? 1}</strong></span>
            </div>
          </div>
        </div>

        {/* Price & Payment Badge */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-xs text-slate-500 block">Price Paid:</span>
            <span className="text-lg font-bold text-slate-900">{formattedPrice}</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-semibold">
            <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
            <span className="uppercase tracking-wide">{payment?.status || 'PAID'}</span>
            <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
