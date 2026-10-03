import React, { useState } from 'react';
import { Headset, ExternalLink, CheckCircle } from 'lucide-react';

interface HelpSupportSectionProps {
  orderNumber?: string;
}

export const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({ orderNumber = '' }) => {
  const [showToast, setShowToast] = useState(false);

  const handleContact = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="bg-gradient-to-br from-vastriya-900 via-vastriya-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-gold-500/20 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <div className="inline-flex items-center space-x-2 text-gold-300 text-xs font-semibold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-white/15">
            <Headset className="h-3.5 w-3.5 text-gold-400" />
            <span>Vastriya Customer Care</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            Need Help With Your Order?
          </h3>
          <p className="text-xs sm:text-sm text-gold-100/80 leading-relaxed">
            If you have any questions about your delivery, please contact Vastriya Customer Support.
          </p>
        </div>

        {/* Support Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleContact}
            className="w-full sm:w-auto px-5 py-3 bg-gold-500 hover:bg-gold-600 text-vastriya-950 font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Headset className="h-4 w-4" />
            <span>Contact Support</span>
          </button>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>View Order Details</span>
            <ExternalLink className="h-3.5 w-3.5 text-gold-300" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="mt-4 p-3 bg-gold-500/20 border border-gold-400/40 rounded-xl text-xs text-gold-200 flex items-center space-x-2 animate-fade-in">
          <CheckCircle className="h-4 w-4 text-gold-400 shrink-0" />
          <span>Support request initiated for order #{orderNumber || 'VAS123456'}. Our team will contact you within 2 hours.</span>
        </div>
      )}
    </div>
  );
};
