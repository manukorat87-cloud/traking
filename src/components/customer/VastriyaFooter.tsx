import React from 'react';
import { ShieldCheck, Lock, Headset } from 'lucide-react';

export const VastriyaFooter: React.FC = () => {
  return (
    <footer className="bg-vastriya-950 text-gold-100/90 pt-12 pb-8 border-t border-gold-500/20 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Branding & Subtitle */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2">
            <span className="font-serif text-3xl font-bold tracking-wider text-white">VASTRIYA</span>
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-gold-300/90 tracking-wide">
            Ethnic Wear for Your Celebrations
          </p>
        </div>

        {/* Categories Link Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs uppercase tracking-widest font-semibold text-gold-200/80 border-y border-white/10 py-4">
          <span className="hover:text-gold-300 transition-colors cursor-pointer">Ghaghra Choli</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-300 transition-colors cursor-pointer">Lehenga</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-300 transition-colors cursor-pointer">Saree</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-300 transition-colors cursor-pointer">Kurti</span>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-300">
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Lock className="h-3.5 w-3.5 text-gold-400" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            <span>Safe Shopping</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Headset className="h-3.5 w-3.5 text-gold-400" />
            <span>Order Support</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-[11px] text-slate-400 pt-4 space-y-1">
          <p>© {new Date().getFullYear()} Vastriya Ethnic Wear. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
