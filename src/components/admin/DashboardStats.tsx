import React from 'react';
import { Package, Truck, CheckCircle2, Navigation, Link2 } from 'lucide-react';
import { DashboardMetrics } from '../../types';

interface DashboardStatsProps {
  metrics: DashboardMetrics;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'TOTAL ORDERS',
      value: metrics.totalOrders,
      icon: Package,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      badge: 'Real-time MongoDB',
    },
    {
      title: 'IN TRANSIT',
      value: metrics.inTransit,
      icon: Truck,
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      badge: 'Hub Routing',
    },
    {
      title: 'OUT FOR DELIVERY',
      value: metrics.outForDelivery,
      icon: Navigation,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      badge: 'Day 6 Stage',
    },
    {
      title: 'DELIVERED',
      value: metrics.delivered,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      badge: 'Completed',
    },
    {
      title: 'TRACKING ACTIVE',
      value: metrics.trackingActive,
      icon: Link2,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      badge: 'Unique Token Generated',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {card.badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
