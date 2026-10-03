import React from 'react';
import { TimelineStep } from '../../types';
import { ShoppingBag, Truck, Building2, MapPin, CheckCircle2, Circle } from 'lucide-react';

interface DeliveryProgressTimelineProps {
  timeline: TimelineStep[];
  deliveryAddressFormatted?: string;
}

export const DeliveryProgressTimeline: React.FC<DeliveryProgressTimelineProps> = ({
  timeline,
  deliveryAddressFormatted = 'Your Registered Delivery Address',
}) => {
  const getStepIcon = (iconName: string, isCompleted: boolean, isCurrent: boolean) => {
    const iconClass = `h-4 w-4 sm:h-4.5 sm:w-4.5 ${
      isCurrent
        ? 'text-gold-200'
        : isCompleted
        ? 'text-vastriya-900'
        : 'text-slate-400'
    }`;

    switch (iconName) {
      case 'package':
        return <ShoppingBag className={iconClass} />;
      case 'truck':
        return <Truck className={iconClass} />;
      case 'warehouse':
        return <Building2 className={iconClass} />;
      case 'map-pin':
        return <MapPin className={iconClass} />;
      case 'check':
        return <CheckCircle2 className={iconClass} />;
      default:
        return <Circle className={iconClass} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-950/10 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Delivery Progress
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time courier updates across processing hubs
          </p>
        </div>

        <div className="self-start sm:self-auto">
          <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-900 text-xs font-semibold rounded-full border border-amber-200/80">
            7-Day Automatic Tracking
          </span>
        </div>
      </div>

      {/* Vertical Courier Timeline */}
      <div className="relative">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;

          return (
            <div key={step.id || idx} className="flex space-x-3.5 sm:space-x-5 group">
              {/* Column 1: Circle Icon & Vertical Line */}
              <div className="flex flex-col items-center shrink-0 w-8 sm:w-10 relative">
                {/* Status Circle Icon */}
                <div className="relative z-10 shrink-0">
                  {step.current ? (
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-vastriya-900 border-2 border-gold-500 flex items-center justify-center shadow-lg shadow-vastriya-900/30 pulse-badge">
                      {getStepIcon(step.iconName, step.completed, step.current)}
                    </div>
                  ) : step.completed ? (
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-vastriya-50 border-2 border-vastriya-800 flex items-center justify-center shadow-sm">
                      {getStepIcon(step.iconName, step.completed, step.current)}
                    </div>
                  ) : (
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                      {getStepIcon(step.iconName, step.completed, step.current)}
                    </div>
                  )}
                </div>

                {/* Vertical Line passing through center */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 rounded-full transition-colors duration-300 ${
                      step.completed ? 'bg-vastriya-800/80' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>

              {/* Column 2: Step Information */}
              <div className={`flex-1 pb-7 sm:pb-8 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-sm sm:text-base font-bold tracking-wide uppercase ${
                        step.current
                          ? 'text-vastriya-900 font-extrabold'
                          : step.completed
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {step.current && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-vastriya-900 text-gold-200 border border-gold-500/40 shadow-sm animate-pulse">
                        Current Status
                      </span>
                    )}
                  </div>

                  <span
                    className={`text-xs font-semibold whitespace-nowrap font-mono ${
                      step.current
                        ? 'text-vastriya-900 font-bold'
                        : step.completed
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.date}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                    step.upcoming ? 'text-slate-400' : 'text-slate-600 font-medium'
                  }`}
                >
                  {step.description}
                </p>

                {/* Location / Address Tag */}
                {step.location && !step.upcoming && (
                  <div className="mt-2 inline-flex items-center space-x-1.5 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60 max-w-full overflow-hidden">
                    <MapPin className="h-3 w-3 text-vastriya-700 shrink-0" />
                    <span className="truncate">
                      {step.status === 'OUT_FOR_DELIVERY' || step.status === 'DELIVERED'
                        ? deliveryAddressFormatted
                        : step.location}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
