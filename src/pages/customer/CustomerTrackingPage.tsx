import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPublicTracking, fetchSettings } from '../../services/api';
import { PublicOrderTracking, AppSettings } from '../../types';
import { TrackingHeader } from '../../components/customer/TrackingHeader';
import { CurrentStatusCard } from '../../components/customer/CurrentStatusCard';
import { VerticalTimeline } from '../../components/customer/VerticalTimeline';
import { AddressSummary } from '../../components/customer/AddressSummary';
import { TrackingNotFound } from '../../components/customer/TrackingNotFound';
import { Spinner } from '../../components/ui/Spinner';

export const CustomerTrackingPage: React.FC = () => {
  const { trackingToken } = useParams<{ trackingToken: string }>();
  const [trackingData, setTrackingData] = useState<PublicOrderTracking | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState<{ isDisabled?: boolean; message?: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!trackingToken) {
        setErrorState({ message: 'No tracking token provided.' });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorState(null);

      try {
        const [data, s] = await Promise.all([
          fetchPublicTracking(trackingToken),
          fetchSettings().catch(() => null),
        ]);
        setTrackingData(data);
        if (s) setSettings(s);
      } catch (err: any) {
        console.error('Failed to load tracking page:', err);
        const msg = err.message || 'Tracking link not found.';
        const isDisabled = msg.toLowerCase().includes('unavailable') || msg.toLowerCase().includes('disabled');
        setErrorState({ isDisabled, message: msg });
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [trackingToken]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <Spinner size="lg" />
        <span className="text-sm font-semibold text-slate-500">Loading tracking information...</span>
      </div>
    );
  }

  if (errorState || !trackingData) {
    return (
      <TrackingNotFound
        isDisabled={errorState?.isDisabled}
        message={errorState?.message}
      />
    );
  }

  const isDelivered = trackingData.currentStatus === 'DELIVERED';

  return (
    <div className="min-h-screen bg-slate-100/70 pb-12 flex flex-col">
      {/* Header */}
      <TrackingHeader
        brandName={settings?.brandName || 'Shopify Store'}
        brandLogo={settings?.brandLogo}
        orderId={trackingData.orderId}
        orderDate={trackingData.orderDate}
      />

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 w-full flex-1">
        {/* Current Status Card */}
        <CurrentStatusCard
          currentStatusLabel={trackingData.currentStatusLabel}
          currentLocation={trackingData.currentLocation}
          estimatedDelivery={trackingData.estimatedDelivery}
          isDelivered={isDelivered}
        />

        {/* Address & Summary */}
        <AddressSummary
          customerName={trackingData.customerName}
          address={trackingData.address}
          city={trackingData.city}
          state={trackingData.state}
          pin={trackingData.pin}
          totalAmount={trackingData.totalAmount}
        />

        {/* 7-Day Vertical Delivery Timeline */}
        <VerticalTimeline timeline={trackingData.timeline} />
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200/60 mt-auto">
        <p>© {new Date().getFullYear()} {settings?.brandName || 'Shopify Store'}. All rights reserved.</p>
        <p className="text-[10px] mt-1 text-slate-400">Simulated Package Tracking System</p>
      </footer>
    </div>
  );
};
