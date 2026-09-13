export interface TimelineStep {
  status: string;
  title: string;
  location?: string;
  description: string;
  date: string;
  isoDate: string;
  completed: boolean;
  current: boolean;
  upcoming: boolean;
}

export interface PublicOrderTracking {
  orderId: string;
  customerName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  totalAmount: string;
  orderDate: string;
  currentStatus: string;
  currentStatusLabel: string;
  currentLocation: string;
  estimatedDelivery: string;
  timeline: TimelineStep[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  email: string;
  first_name: string;
  last_name: string;
  customerName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  total_amount: string;
  order_time: string;
  tracking_token: string | null;
  tracking_enabled: boolean;
  tracking_created_at: string | null;
  currentStatus: string;
  currentStatusLabel: string;
  estimatedDelivery: string;
  trackingDetails?: {
    currentStatus: string;
    currentStatusLabel: string;
    currentLocation: string;
    estimatedDelivery: string;
    timeline: TimelineStep[];
  };
}

export interface DashboardMetrics {
  totalOrders: number;
  inTransit: number;
  outForDelivery: number;
  delivered: number;
  trackingActive: number;
}

export interface AdminUser {
  email: string;
}

export interface AppSettings {
  brandName: string;
  brandLogo: string;
  trackingPageTitle: string;
  estimatedDeliveryDays: number;
  trackingEnabledGlobal: boolean;
  hubsConfig: { key: string; label: string }[];
}
