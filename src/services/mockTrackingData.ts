import { PublicOrderTracking, TimelineStep, CustomerData, ProductData, PaymentData } from '../types';

export const TRACKING_STEPS_CONFIG = [
  {
    id: 'order_placed',
    status: 'ORDER_PLACED',
    title: 'ORDER PLACED',
    description: 'Your order has been successfully placed and confirmed.',
    location: 'Merchant Warehouse',
    dayOffset: 0,
    iconName: 'package' as const,
  },
  {
    id: 'shipment_picked_up',
    status: 'SHIPMENT_PICKED_UP',
    title: 'SHIPMENT PICKED UP',
    description: 'Your package has been picked up by our shipping partner.',
    location: 'Mumbai',
    dayOffset: 1,
    iconName: 'truck' as const,
  },
  {
    id: 'mumbai_hub',
    status: 'MUMBAI_HUB',
    title: 'MUMBAI HUB',
    description: 'Your package has arrived at Mumbai Hub and is being processed.',
    location: 'Mumbai, Maharashtra',
    dayOffset: 2,
    iconName: 'warehouse' as const,
  },
  {
    id: 'thane_hub',
    status: 'THANE_HUB',
    title: 'THANE HUB',
    description: 'Your package has arrived at Thane Hub and is moving to the next destination.',
    location: 'Thane, Maharashtra',
    dayOffset: 3,
    iconName: 'warehouse' as const,
  },
  {
    id: 'bhiwandi_hub',
    status: 'BHIWANDI_HUB',
    title: 'BHIWANDI HUB',
    description: 'Your package has arrived at Bhiwandi Hub and is being processed for onward delivery.',
    location: 'Bhiwandi, Maharashtra',
    dayOffset: 4,
    iconName: 'warehouse' as const,
  },
  {
    id: 'gujarat_hub',
    status: 'GUJARAT_HUB',
    title: 'GUJARAT DELIVERY HUB',
    description: 'Your package has reached the Gujarat Delivery Hub and is moving toward your local delivery area.',
    location: 'Gujarat',
    dayOffset: 5,
    iconName: 'map-pin' as const,
  },
  {
    id: 'out_for_delivery',
    status: 'OUT_FOR_DELIVERY',
    title: 'OUT FOR DELIVERY',
    description: 'Your package is out for delivery and will be delivered to the address provided during checkout.',
    locationDynamic: true,
    dayOffset: 6,
    iconName: 'truck' as const,
  },
  {
    id: 'delivered',
    status: 'DELIVERED',
    title: 'DELIVERED',
    description: 'Your package has been successfully delivered.',
    locationDynamic: true,
    dayOffset: 7,
    iconName: 'check' as const,
  },
];

// Demo dataset mapped by order number or token
const DEMO_ORDERS: Record<string, {
  orderDate: string;
  forcedStatusIndex?: number;
  customer?: CustomerData;
  product?: ProductData;
  payment?: PaymentData;
}> = {
  VAS123456: {
    orderDate: '2026-10-03T10:00:00.000Z',
    forcedStatusIndex: 0, // ORDER PLACED
    customer: {
      name: 'Meet Sheladiya',
      phone: '+91 XXXXX XXXXX',
      email: 'meet@example.com',
      address: {
        line1: '123 Example Street',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '395001',
      },
    },
    product: {
      name: 'Premium Ghaghra Choli',
      size: 'L',
      quantity: 1,
      price: 1999,
      image: '/ghaghra_choli.png',
      category: 'Ghaghra Choli',
    },
    payment: {
      status: 'PAID',
      method: 'UPI',
    },
  },
  VAS123457: {
    orderDate: '2026-10-01T09:30:00.000Z',
    forcedStatusIndex: 2, // MUMBAI HUB
    customer: {
      name: 'Ananya Sharma',
      phone: '+91 98765 43210',
      email: 'ananya@example.com',
      address: {
        line1: 'B-402 Silk Palace Residency, Ring Road',
        city: 'Surat',
        state: 'Gujarat',
        pincode: '395002',
      },
    },
    product: {
      name: 'Royal Heritage Silk Lehenga',
      size: 'M',
      quantity: 1,
      price: 4999,
      image: '/ghaghra_choli.png',
      category: 'Lehenga',
    },
    payment: {
      status: 'PAID',
      method: 'Credit Card',
    },
  },
  VAS123458: {
    orderDate: '2026-09-27T14:15:00.000Z',
    forcedStatusIndex: 6, // OUT FOR DELIVERY
    customer: {
      name: 'Priya Patel',
      phone: '+91 91234 56789',
      email: 'priya@example.com',
      address: {
        line1: '78 Emerald Enclave, Satellite',
        city: 'Ahmedabad',
        state: 'Gujarat',
        pincode: '380015',
      },
    },
    product: {
      name: 'Bandhani Zari Work Saree',
      size: 'Free Size',
      quantity: 1,
      price: 2999,
      image: '/ghaghra_choli.png',
      category: 'Saree',
    },
    payment: {
      status: 'PAID',
      method: 'Net Banking',
    },
  },
  VAS123459: {
    orderDate: '2026-09-25T11:00:00.000Z',
    forcedStatusIndex: 7, // DELIVERED
    customer: {
      name: 'Rohan Verma',
      phone: '+91 99887 76655',
      email: 'rohan@example.com',
      address: {
        line1: '45 Heritage Villas, Alkapuri',
        city: 'Vadodara',
        state: 'Gujarat',
        pincode: '390007',
      },
    },
    product: {
      name: 'Handcrafted Anarkali Kurti Set',
      size: 'XL',
      quantity: 1,
      price: 1799,
      image: '/ghaghra_choli.png',
      category: 'Kurti',
    },
    payment: {
      status: 'PAID',
      method: 'UPI',
    },
  },
};

const DEFAULT_CUSTOMER: CustomerData = {
  name: 'Meet Sheladiya',
  phone: '+91 XXXXX XXXXX',
  email: 'customer@example.com',
  address: {
    line1: '123 Example Street',
    city: 'Surat',
    state: 'Gujarat',
    pincode: '395001',
  },
};

const DEFAULT_PRODUCT: ProductData = {
  name: 'Premium Ghaghra Choli',
  size: 'L',
  quantity: 1,
  price: 1999,
  image: '/ghaghra_choli.png',
  category: 'Ghaghra Choli',
};

const DEFAULT_PAYMENT: PaymentData = {
  status: 'PAID',
  method: 'UPI',
};

/**
 * Formats a JS Date object into a readable string like "3 Oct 2026" or "3 Oct"
 */
export function formatTrackingDate(date: Date, includeYear = false): string {
  const day = date.getDate();
  const monthsShort = ['Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct', 'Oct'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthStr = monthNames[date.getMonth()];
  if (includeYear) {
    return `${day} ${monthStr} ${date.getFullYear()}`;
  }
  return `${day} ${monthStr}`;
}

/**
 * Generate tracking timeline dynamically for any order number & base date
 */
export function buildTrackingData(inputOrderNumber: string): PublicOrderTracking | null {
  const cleanNum = inputOrderNumber.trim().toUpperCase();

  // Validate order number format (Must match VAS... or be at least 4 chars)
  if (!cleanNum || cleanNum.length < 3) {
    return null;
  }

  // If order number starts with non-matching pattern and isn't VAS, return null for invalid demo test
  if (cleanNum === 'INVALID' || cleanNum === 'ERROR' || cleanNum === '404' || cleanNum === '000000') {
    return null;
  }

  const demoMatch = DEMO_ORDERS[cleanNum];
  const customer = demoMatch?.customer || DEFAULT_CUSTOMER;
  const product = demoMatch?.product || DEFAULT_PRODUCT;
  const payment = demoMatch?.payment || DEFAULT_PAYMENT;

  // Base date calculation
  const baseDate = demoMatch?.orderDate ? new Date(demoMatch.orderDate) : new Date('2026-10-03T10:00:00.000Z');
  const fullAddressString = `${customer.address.line1}, ${customer.address.city}, ${customer.address.state} - ${customer.address.pincode}`;

  // Determine active index
  let activeIndex = 0;
  if (demoMatch && typeof demoMatch.forcedStatusIndex === 'number') {
    activeIndex = demoMatch.forcedStatusIndex;
  } else {
    // Dynamic calculation based on current date vs baseDate
    const now = new Date();
    const diffMs = now.getTime() - baseDate.getTime();
    const elapsedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (elapsedDays <= 0) activeIndex = 0;
    else if (elapsedDays >= 7) activeIndex = 7;
    else activeIndex = elapsedDays;
  }

  // Calculate estimated delivery date (+7 days from baseDate)
  const estDeliveryDate = new Date(baseDate);
  estDeliveryDate.setDate(estDeliveryDate.getDate() + 7);

  // Construct timeline steps
  const timeline: TimelineStep[] = TRACKING_STEPS_CONFIG.map((stepConfig, idx) => {
    const stepDate = new Date(baseDate);
    stepDate.setDate(stepDate.getDate() + stepConfig.dayOffset);

    const isCompleted = idx < activeIndex || activeIndex === 7;
    const isCurrent = idx === activeIndex && activeIndex !== 7;
    const isUpcoming = idx > activeIndex;

    let location = stepConfig.location;
    if (stepConfig.locationDynamic) {
      location = `${customer.address.line1}, ${customer.address.city}`;
    }

    return {
      id: stepConfig.id,
      status: stepConfig.status,
      title: stepConfig.title,
      description: stepConfig.description,
      location,
      dayOffset: stepConfig.dayOffset,
      iconName: stepConfig.iconName,
      date: formatTrackingDate(stepDate, false),
      isoDate: stepDate.toISOString(),
      completed: isCompleted,
      current: isCurrent,
      upcoming: isUpcoming,
    };
  });

  const activeStepConfig = TRACKING_STEPS_CONFIG[activeIndex];

  return {
    orderNumber: cleanNum,
    orderId: cleanNum,
    orderDate: formatTrackingDate(baseDate, true),
    estimatedDelivery: formatTrackingDate(estDeliveryDate, true),
    currentStatus: activeStepConfig.status,
    currentStatusLabel: activeStepConfig.title,
    currentLocation: activeStepConfig.location || `${customer.address.city}, ${customer.address.state}`,
    customer,
    product,
    payment,
    timeline,
  };
}

/**
 * Safely normalizes tracking data from any backend response or mock source
 */
export function normalizeTrackingData(data: any): PublicOrderTracking | null {
  if (!data) return null;

  const line1 = data.customer?.address?.line1 || data.address || '123 Example Street';
  const city = data.customer?.address?.city || data.city || 'Surat';
  const state = data.customer?.address?.state || data.state || 'Gujarat';
  const pincode = data.customer?.address?.pincode || data.pin || '395001';

  const customer: CustomerData = {
    name: data.customer?.name || data.customerName || 'Meet Sheladiya',
    phone: data.customer?.phone || data.phone || '+91 XXXXX XXXXX',
    email: data.customer?.email || data.email || 'customer@example.com',
    address: { line1, city, state, pincode },
  };

  const priceNum = typeof data.product?.price === 'number'
    ? data.product.price
    : parseFloat(data.totalAmount || data.total_amount) || 1999;

  const product: ProductData = {
    name: data.product?.name || data.product_name || 'Premium Ghaghra Choli',
    size: data.product?.size || data.product_size || 'L',
    quantity: data.product?.quantity || data.product_quantity || 1,
    price: priceNum,
    image: data.product?.image || '/ghaghra_choli.png',
    category: data.product?.category || 'Ethnic Wear',
  };

  const payment: PaymentData = {
    status: data.payment?.status || 'PAID',
    method: data.payment?.method || 'UPI',
  };

  return {
    orderNumber: data.orderNumber || data.orderId || 'VAS123456',
    orderId: data.orderId || data.orderNumber || 'VAS123456',
    orderDate: data.orderDate || '3 Oct 2026',
    estimatedDelivery: data.estimatedDelivery || '10 Oct 2026',
    currentStatus: data.currentStatus || 'ORDER_PLACED',
    currentStatusLabel: data.currentStatusLabel || data.currentStatus || 'ORDER PLACED',
    currentLocation: data.currentLocation || 'Merchant Warehouse',
    customer,
    product,
    payment,
    timeline: data.timeline || [],
  };
}

