import { TrackingProvider, OrderInputData, TrackingTimelineResult, TimelineStep } from './TrackingProvider.js';

export class SimulatedTrackingProvider implements TrackingProvider {
  /**
   * Resolves the hub name for the destination city (Day 5)
   */
  private getNearestHubName(city?: string): string {
    if (!city) return 'Nearest Delivery Hub';
    const cleanCity = city.trim().toLowerCase();
    
    if (cleanCity.includes('surat')) return 'Surat Delivery Hub';
    if (cleanCity.includes('ahmedabad')) return 'Ahmedabad Delivery Hub';
    if (cleanCity.includes('vadodara') || cleanCity.includes('baroda')) return 'Vadodara Delivery Hub';
    if (cleanCity.includes('mumbai')) return 'Mumbai Delivery Hub';
    if (cleanCity.includes('pune')) return 'Pune Delivery Hub';
    if (cleanCity.includes('delhi')) return 'Delhi Delivery Hub';
    if (cleanCity.includes('bangalore') || cleanCity.includes('bengaluru')) return 'Bengaluru Delivery Hub';
    
    const formattedCity = city.trim().charAt(0).toUpperCase() + city.trim().slice(1);
    return `${formattedCity} Delivery Hub`;
  }

  public getTrackingTimeline(order: OrderInputData): TrackingTimelineResult {
    // 1. Determine base start date (prefer tracking_created_at if generated, fallback to order_time)
    const rawTime = order.tracking_created_at || order.order_time || order.created_at || order.createdAt;
    const baseDate = rawTime ? new Date(rawTime) : new Date();
    
    const validBaseDate = isNaN(baseDate.getTime()) ? new Date() : baseDate;
    const now = new Date();

    // 2. Define the 8 stages (Day 0 to Day 7)
    const nearestHub = this.getNearestHubName(order.city);

    const stagesConfig = [
      {
        dayOffset: 0,
        status: 'ORDER_PLACED',
        title: 'ORDER PLACED',
        location: 'Merchant Warehouse',
        description: 'Your order has been confirmed.',
      },
      {
        dayOffset: 1,
        status: 'PICKED_UP',
        title: 'SHIPMENT PICKED UP',
        location: 'Logistics Facility',
        description: 'Your package has been picked up by the shipping partner.',
      },
      {
        dayOffset: 2,
        status: 'MUMBAI_HUB',
        title: 'MUMBAI HUB',
        location: 'Mumbai Central Sorting Hub',
        description: 'Your package has arrived at Mumbai Hub.',
      },
      {
        dayOffset: 3,
        status: 'THANE_HUB',
        title: 'THANE HUB',
        location: 'Thane Regional Logistics Center',
        description: 'Your package has arrived at Thane Hub.',
      },
      {
        dayOffset: 4,
        status: 'BHIWANDI_HUB',
        title: 'BHIWANDI HUB',
        location: 'Bhiwandi Gateway Hub',
        description: 'Your package has arrived at Bhiwandi Hub.',
      },
      {
        dayOffset: 5,
        status: 'NEAREST_HUB',
        title: nearestHub.toUpperCase(),
        location: nearestHub,
        description: `Your package is moving to your nearest delivery hub (${nearestHub}).`,
      },
      {
        dayOffset: 6,
        status: 'OUT_FOR_DELIVERY',
        title: 'OUT FOR DELIVERY',
        location: `${order.city || 'Local'} Delivery Courier`,
        description: 'Your package is out for delivery.',
      },
      {
        dayOffset: 7,
        status: 'DELIVERED',
        title: 'DELIVERED',
        location: `${order.city || 'Destination Address'}`,
        description: 'Your package has been delivered.',
      },
    ];

    // 3. Calculate calendar day difference between base date and current date
    const startOfBaseDate = new Date(validBaseDate.getFullYear(), validBaseDate.getMonth(), validBaseDate.getDate());
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const diffTimeMs = startOfToday.getTime() - startOfBaseDate.getTime();
    const elapsedDays = Math.floor(diffTimeMs / (1000 * 60 * 60 * 24));
    
    // Clamp active index between 0 and 7
    let activeIndex = 0;
    if (elapsedDays < 0) {
      activeIndex = 0;
    } else if (elapsedDays >= 7) {
      activeIndex = 7;
    } else {
      activeIndex = elapsedDays;
    }

    // Date formatting helpers
    const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNamesLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const formatShortDate = (d: Date) => {
      const day = d.getDate();
      const month = monthNamesShort[d.getMonth()];
      return `${day} ${month}`;
    };

    const formatLongDate = (d: Date) => {
      const day = d.getDate();
      const month = monthNamesLong[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${month} ${year}`;
    };

    // 4. Construct timeline steps
    const timeline: TimelineStep[] = stagesConfig.map((stage, idx) => {
      const stepDate = new Date(validBaseDate);
      stepDate.setDate(stepDate.getDate() + stage.dayOffset);

      const isCompleted = idx < activeIndex || activeIndex === 7;
      const isCurrent = idx === activeIndex && activeIndex !== 7;
      const isUpcoming = idx > activeIndex;

      return {
        status: stage.status,
        title: stage.title,
        location: stage.location,
        description: stage.description,
        date: formatShortDate(stepDate),
        isoDate: stepDate.toISOString(),
        completed: isCompleted,
        current: isCurrent,
        upcoming: isUpcoming,
      };
    });

    const currentStage = stagesConfig[activeIndex];
    const estimatedDeliveryDate = new Date(validBaseDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

    return {
      currentStatus: currentStage.status,
      currentStatusLabel: currentStage.description,
      currentLocation: currentStage.location,
      estimatedDelivery: formatLongDate(estimatedDeliveryDate),
      estimatedDeliveryIso: estimatedDeliveryDate.toISOString(),
      timeline,
    };
  }
}
