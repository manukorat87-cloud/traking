import React from 'react';

export const TrackingSkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-pulse">
      {/* Search Header Skeleton */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto" />
        <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto" />
        <div className="h-12 bg-slate-100 rounded-xl w-full max-w-lg mx-auto" />
      </div>

      {/* Summary Card Skeleton */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-6 bg-slate-200 rounded-full w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-20 bg-slate-100 rounded-2xl" />
          <div className="h-20 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      {/* Timeline Skeleton */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm space-y-6">
        <div className="h-6 bg-slate-200 rounded w-1/4" />
        <div className="space-y-6 pl-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-slate-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
