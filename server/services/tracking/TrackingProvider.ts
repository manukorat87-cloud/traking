export interface TimelineStep {
  status: string;
  title: string;
  location?: string;
  description: string;
  date: string;       // Human readable date string (e.g. "12 Sep")
  isoDate: string;    // ISO timestamp string
  completed: boolean;
  current: boolean;
  upcoming: boolean;
}

export interface TrackingTimelineResult {
  currentStatus: string;
  currentStatusLabel: string;
  currentLocation: string;
  estimatedDelivery: string; // Human readable formatted date (e.g. "19 September 2026")
  estimatedDeliveryIso: string;
  timeline: TimelineStep[];
}

export interface OrderInputData {
  order_time?: string | Date;
  created_at?: string | Date;
  city?: string;
  state?: string;
  address?: string;
  pin?: string;
  [key: string]: any;
}

export interface TrackingProvider {
  getTrackingTimeline(order: OrderInputData): TrackingTimelineResult;
}
