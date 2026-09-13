import { ObjectId } from 'mongodb';
import { getOrdersCollection } from '../config/db.js';
import { trackingService } from './tracking/index.js';
import crypto from 'crypto';

export interface OrderQueryOptions {
  search?: string;
  statusFilter?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export function generateSecureToken(length = 12): string {
  const bytes = crypto.randomBytes(length);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

export async function getOrders(options: OrderQueryOptions) {
  const collection = await getOrdersCollection();
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, Math.min(100, options.limit || 10));
  const skip = (page - 1) * limit;

  // Build MongoDB query filter
  const query: any = {};

  // Text / multi-field regex search
  if (options.search && options.search.trim() !== '') {
    const searchRegex = new RegExp(options.search.trim(), 'i');
    const searchConditions: any[] = [
      { first_name: searchRegex },
      { last_name: searchRegex },
      { email: searchRegex },
      { city: searchRegex },
      { tracking_token: searchRegex },
    ];

    // Check if search query matches ObjectId format
    if (ObjectId.isValid(options.search.trim())) {
      try {
        searchConditions.push({ _id: new ObjectId(options.search.trim()) });
      } catch (e) {
        // ignore invalid objectId
      }
    }
    
    // Support order_id or id fields if present
    searchConditions.push({ order_id: searchRegex });
    searchConditions.push({ id: searchRegex });

    query.$or = searchConditions;
  }

  // Date filtering
  if (options.startDate || options.endDate) {
    query.order_time = {};
    if (options.startDate) {
      query.order_time.$gte = new Date(options.startDate).toISOString();
    }
    if (options.endDate) {
      query.order_time.$lte = new Date(options.endDate).toISOString();
    }
  }

  // Retrieve raw matching orders
  const totalCount = await collection.countDocuments(query);
  const rawOrders = await collection.find(query).sort({ order_time: -1, _id: -1 }).skip(skip).limit(limit).toArray();

  // Map orders with tracking details
  const orders = rawOrders.map((doc) => {
    const trackingInfo = trackingService.getTrackingTimeline(doc);
    const trackingEnabled = doc.tracking_enabled !== false; // Default true if not explicitly false

    return {
      id: doc._id.toString(),
      orderId: doc.order_id || doc._id.toString().substring(0, 8).toUpperCase(),
      email: doc.email || '',
      first_name: doc.first_name || '',
      last_name: doc.last_name || '',
      customerName: `${doc.first_name || ''} ${doc.last_name || ''}`.trim() || 'Customer',
      address: doc.address || '',
      city: doc.city || '',
      state: doc.state || '',
      pin: doc.pin || '',
      total_amount: doc.total_amount || '0',
      order_time: doc.order_time || doc.created_at || new Date().toISOString(),
      tracking_token: doc.tracking_token || null,
      tracking_enabled: trackingEnabled,
      tracking_created_at: doc.tracking_created_at || null,
      currentStatus: trackingInfo.currentStatus,
      currentStatusLabel: trackingInfo.currentStatusLabel,
      estimatedDelivery: trackingInfo.estimatedDelivery,
    };
  });

  // Client-side status filter
  let filteredOrders = orders;
  if (options.statusFilter && options.statusFilter !== 'all') {
    const filter = options.statusFilter.toLowerCase();
    filteredOrders = orders.filter((o) => {
      if (filter === 'delivered') return o.currentStatus === 'DELIVERED';
      if (filter === 'out_for_delivery') return o.currentStatus === 'OUT_FOR_DELIVERY';
      if (filter === 'in_transit') return o.currentStatus !== 'DELIVERED' && o.currentStatus !== 'OUT_FOR_DELIVERY';
      if (filter === 'tracking_active') return !!o.tracking_token && o.tracking_enabled;
      if (filter === 'tracking_inactive') return !o.tracking_token || !o.tracking_enabled;
      return true;
    });
  }

  return {
    orders: filteredOrders,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1,
    },
  };
}

export async function getOrderById(idString: string) {
  const collection = await getOrdersCollection();
  
  let query: any = {};
  if (ObjectId.isValid(idString)) {
    query = { _id: new ObjectId(idString) };
  } else {
    query = { order_id: idString };
  }

  const doc = await collection.findOne(query);
  if (!doc) return null;

  const trackingInfo = trackingService.getTrackingTimeline(doc);
  const trackingEnabled = doc.tracking_enabled !== false;

  return {
    id: doc._id.toString(),
    orderId: doc.order_id || doc._id.toString().substring(0, 8).toUpperCase(),
    email: doc.email || '',
    first_name: doc.first_name || '',
    last_name: doc.last_name || '',
    customerName: `${doc.first_name || ''} ${doc.last_name || ''}`.trim() || 'Customer',
    address: doc.address || '',
    city: doc.city || '',
    state: doc.state || '',
    pin: doc.pin || '',
    total_amount: doc.total_amount || '0',
    order_time: doc.order_time || doc.created_at || new Date().toISOString(),
    tracking_token: doc.tracking_token || null,
    tracking_enabled: trackingEnabled,
    tracking_created_at: doc.tracking_created_at || null,
    trackingDetails: trackingInfo,
  };
}

export async function generateOrGetTrackingToken(idString: string) {
  const collection = await getOrdersCollection();
  
  let query: any = {};
  if (ObjectId.isValid(idString)) {
    query = { _id: new ObjectId(idString) };
  } else {
    query = { order_id: idString };
  }

  const order = await collection.findOne(query);
  if (!order) {
    throw new Error('Order not found');
  }

  // If token already exists, reuse it!
  if (order.tracking_token) {
    return {
      tracking_token: order.tracking_token,
      tracking_enabled: order.tracking_enabled !== false,
      tracking_created_at: order.tracking_created_at,
    };
  }

  // Generate new 12-char secure token
  const newTok = generateSecureToken();
  const createdAt = new Date().toISOString();

  await collection.updateOne(query, {
    $set: {
      tracking_token: newTok,
      tracking_enabled: true,
      tracking_created_at: createdAt,
    },
  });

  return {
    tracking_token: newTok,
    tracking_enabled: true,
    tracking_created_at: createdAt,
  };
}

export async function toggleTrackingState(idString: string, enabled: boolean) {
  const collection = await getOrdersCollection();
  
  let query: any = {};
  if (ObjectId.isValid(idString)) {
    query = { _id: new ObjectId(idString) };
  } else {
    query = { order_id: idString };
  }

  const result = await collection.updateOne(query, {
    $set: { tracking_enabled: enabled },
  });

  if (result.matchedCount === 0) {
    throw new Error('Order not found');
  }

  return { tracking_enabled: enabled };
}

export async function getDashboardMetrics() {
  const collection = await getOrdersCollection();
  const allOrders = await collection.find({}).toArray();

  let totalOrders = allOrders.length;
  let inTransit = 0;
  let outForDelivery = 0;
  let delivered = 0;
  let trackingActive = 0;

  allOrders.forEach((doc) => {
    const timelineResult = trackingService.getTrackingTimeline(doc);
    const isEnabled = doc.tracking_enabled !== false;

    if (doc.tracking_token && isEnabled) {
      trackingActive++;
    }

    if (timelineResult.currentStatus === 'DELIVERED') {
      delivered++;
    } else if (timelineResult.currentStatus === 'OUT_FOR_DELIVERY') {
      outForDelivery++;
    } else {
      inTransit++;
    }
  });

  return {
    totalOrders,
    inTransit,
    outForDelivery,
    delivered,
    trackingActive,
  };
}

export async function getPublicTrackingByToken(token: string) {
  const collection = await getOrdersCollection();
  const order = await collection.findOne({ tracking_token: token });

  if (!order) {
    return { error: 'NOT_FOUND', message: 'Tracking link not found. Please check your tracking link and try again.' };
  }

  if (order.tracking_enabled === false) {
    return { error: 'DISABLED', message: 'Order tracking is currently unavailable for this order.' };
  }

  const trackingInfo = trackingService.getTrackingTimeline(order);

  return {
    orderId: order.order_id || order._id.toString().substring(0, 8).toUpperCase(),
    customerName: `${order.first_name || ''} ${order.last_name || ''}`.trim() || 'Valued Customer',
    address: order.address || '',
    city: order.city || '',
    state: order.state || '',
    pin: order.pin || '',
    totalAmount: order.total_amount || '0',
    orderDate: order.order_time || order.created_at || new Date().toISOString(),
    currentStatus: trackingInfo.currentStatus,
    currentStatusLabel: trackingInfo.currentStatusLabel,
    currentLocation: trackingInfo.currentLocation,
    estimatedDelivery: trackingInfo.estimatedDelivery,
    timeline: trackingInfo.timeline,
  };
}
