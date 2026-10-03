import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPublicTracking } from '../../services/api';
import { buildTrackingData, normalizeTrackingData } from '../../services/mockTrackingData';
import { PublicOrderTracking } from '../../types';

import { TrackingHeader } from '../../components/customer/TrackingHeader';
import { TrackingSearch } from '../../components/customer/TrackingSearch';
import { OrderSummaryCard } from '../../components/customer/OrderSummaryCard';
import { DeliveryProgressTimeline } from '../../components/customer/DeliveryProgressTimeline';
import { DeliveryAddressCard } from '../../components/customer/DeliveryAddressCard';
import { OrderDetailsCard } from '../../components/customer/OrderDetailsCard';
import { HelpSupportSection } from '../../components/customer/HelpSupportSection';
import { TrackingNotFound } from '../../components/customer/TrackingNotFound';
import { TrackingSkeletonLoader } from '../../components/customer/TrackingSkeletonLoader';
import { VastriyaFooter } from '../../components/customer/VastriyaFooter';

export const CustomerTrackingPage: React.FC = () => {
  const { trackingToken } = useParams<{ trackingToken?: string }>();
  const navigate = useNavigate();

  // Active order number state (defaults to token or VAS123456)
  const currentOrderNum = trackingToken || 'VAS123456';

  const [trackingData, setTrackingData] = useState<PublicOrderTracking | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorState, setErrorState] = useState<{ message?: string } | null>(null);

  const loadOrder = useCallback(async (orderNum: string) => {
    const cleanNum = orderNum.trim().toUpperCase();
    if (!cleanNum) return;

    setIsLoading(true);
    setErrorState(null);

    try {
      // 1. Attempt API server fetch first
      const rawApiData = await fetchPublicTracking(cleanNum);
      const normalizedApi = normalizeTrackingData(rawApiData);
      if (normalizedApi && normalizedApi.timeline) {
        setTrackingData(normalizedApi);
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.warn(`[TrackingPage] Server API lookup failed for ${cleanNum}. Checking simulated dataset...`);
    }

    // 2. Fallback to dynamic tracking generator if server not running or mock order
    const localData = buildTrackingData(cleanNum);
    const normalizedLocal = normalizeTrackingData(localData);
    if (normalizedLocal) {
      setTrackingData(normalizedLocal);
      setErrorState(null);
    } else {
      setTrackingData(null);
      setErrorState({ message: `We couldn't find an order with order number "${cleanNum}". Please check and try again.` });
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadOrder(currentOrderNum);
  }, [currentOrderNum, loadOrder]);

  const handleSearchOrder = (newOrderNum: string) => {
    const clean = newOrderNum.trim().toUpperCase();
    navigate(`/track/${encodeURIComponent(clean)}`);
  };

  const handleResetSearch = () => {
    navigate('/track/VAS123456');
  };

  const deliveryAddressFormatted = trackingData?.customer?.address
    ? `${trackingData.customer.address.line1}, ${trackingData.customer.address.city}, ${trackingData.customer.address.state} - ${trackingData.customer.address.pincode}`
    : 'Your Registered Delivery Address';

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-between text-slate-800">
      {/* 1. Header */}
      <TrackingHeader onResetSearch={handleResetSearch} />

      {/* 2. Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 w-full flex-1">
        {/* Tracking Search Input */}
        <TrackingSearch
          onSearch={handleSearchOrder}
          initialOrderNumber={currentOrderNum}
          isLoading={isLoading}
        />

        {/* Loading Skeleton */}
        {isLoading ? (
          <TrackingSkeletonLoader />
        ) : errorState || !trackingData ? (
          /* Error / Empty State */
          <TrackingNotFound
            searchedOrderNumber={currentOrderNum}
            onTryAgain={() => loadOrder('VAS123456')}
            message={errorState?.message}
          />
        ) : (
          /* Successful Tracking View */
          <div className="space-y-8 animate-fade-in">
            {/* 3. Order Summary Card */}
            <OrderSummaryCard data={trackingData} />

            {/* 4. Delivery Progress Timeline */}
            <DeliveryProgressTimeline
              timeline={trackingData.timeline}
              deliveryAddressFormatted={deliveryAddressFormatted}
            />

            {/* 5. Address & Product Details Grid (2-Column Desktop, Stacked Mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <DeliveryAddressCard customer={trackingData.customer} />
              <OrderDetailsCard product={trackingData.product} payment={trackingData.payment} />
            </div>

            {/* 6. Help / Support Section */}
            <HelpSupportSection orderNumber={trackingData.orderNumber} />
          </div>
        )}
      </main>

      {/* 7. Footer */}
      <VastriyaFooter />
    </div>
  );
};
