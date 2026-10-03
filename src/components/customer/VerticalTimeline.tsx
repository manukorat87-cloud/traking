import React from 'react';
import { Check, Circle } from 'lucide-react';
import { TimelineStep } from '../../types';

interface VerticalTimelineProps {
  timeline: TimelineStep[];
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ timeline }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-6 flex items-center justify-between">
        <span>Delivery Progress</span>
        <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
          7-Day Automatic Tracking
        </span>
      </h3>

      <div className="space-y-0">
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;

          return (
            <div key={idx} className="flex space-x-4 sm:space-x-5 group">
              {/* Column 1: Icon & Centered Connector Line */}
              <div className="flex flex-col items-center shrink-0 w-8 sm:w-9 relative">
                {/* Timeline Icon */}
                <div className="relative z-10 shrink-0">
                  {step.completed ? (
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
                    </div>
                  ) : step.current ? (
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30 pulse-badge z-10">
                      <div className="h-3 w-3 bg-white rounded-full" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-slate-100 text-slate-400 border-2 border-slate-200 flex items-center justify-center">
                      <Circle className="h-3.5 w-3.5 fill-slate-300 stroke-none" />
                    </div>
                  )}
                </div>

                {/* Vertical Line Segment passing through EXACT center */}
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 rounded-full transition-colors ${
                      step.completed ? 'bg-emerald-400/80' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>

              {/* Column 2: Step Information Content */}
              <div className={`flex-1 pb-8 ${isLast ? 'pb-0' : ''} ${step.upcoming ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 pt-0.5">
                  <div className="flex items-center space-x-2">
                    <h4
                      className={`text-sm sm:text-base font-bold ${
                        step.current
                          ? 'text-brand-700 font-extrabold'
                          : step.completed
                          ? 'text-slate-900'
                          : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </h4>

                    {step.current && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-100 text-brand-700 border border-brand-200 animate-pulse">
                        Current Status
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap font-mono">
                    {step.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  {step.description}
                </p>

                {step.location && !step.upcoming && (
                  <span className="inline-block mt-1.5 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    Location: {step.location}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
