import { SimulatedTrackingProvider } from './SimulatedTrackingProvider.js';
import { TrackingProvider } from './TrackingProvider.js';

// Default provider is SimulatedTrackingProvider (can easily be swapped with CourierTrackingProvider in future)
export const trackingService: TrackingProvider = new SimulatedTrackingProvider();

export * from './TrackingProvider.js';
export * from './SimulatedTrackingProvider.js';
