import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

interface TrackingHeaderProps {
  onResetSearch?: () => void;
}

export const TrackingHeader: React.FC<TrackingHeaderProps> = ({ onResetSearch }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-amber-950/10 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Desktop & Mobile Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onResetSearch}>
          <div className="h-10 w-10 rounded-full bg-vastriya-900 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-md">
            <span className="font-serif text-xl font-bold tracking-tighter">V</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-vastriya-950 uppercase">
                Vastriya
              </span>
              <Sparkles className="h-3.5 w-3.5 text-gold-500 hidden sm:inline-block" />
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-900/60 block -mt-1">
              Ethnic Wear
            </span>
          </div>
        </div>

        {/* Navigation Categories - Desktop Only */}
        <nav className="hidden md:flex items-center space-x-6 text-xs uppercase tracking-widest font-medium text-slate-600">
          <span className="hover:text-vastriya-900 transition-colors cursor-pointer">Ghaghra Choli</span>
          <span className="text-amber-300">•</span>
          <span className="hover:text-vastriya-900 transition-colors cursor-pointer">Lehenga</span>
          <span className="text-amber-300">•</span>
          <span className="hover:text-vastriya-900 transition-colors cursor-pointer">Saree</span>
          <span className="text-amber-300">•</span>
          <span className="hover:text-vastriya-900 transition-colors cursor-pointer">Kurti</span>
        </nav>

        {/* Secure Shopping Indicator - Desktop & Mobile */}
        <div className="flex items-center space-x-1.5 bg-gold-50 border border-gold-200/80 px-3 py-1.5 rounded-full text-xs text-amber-900 font-medium">
          <ShieldCheck className="h-4 w-4 text-gold-600 shrink-0" />
          <span className="hidden sm:inline">100% Secure Shopping</span>
          <span className="sm:hidden text-[11px] font-semibold">Secure</span>
        </div>
      </div>
    </header>
  );
};
