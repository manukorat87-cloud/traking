import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  ShieldOff, 
  Package, 
  User, 
  MapPin, 
  Truck,
  Mail
} from 'lucide-react';
import { OrderItem } from '../../types';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { generateTrackingLink, toggleTracking, sendTrackingEmail } from '../../services/api';

interface OrderDetailModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderUpdated: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onOrderUpdated,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isSendingMail, setIsSendingMail] = useState(false);

  if (!order) return null;

  const trackingUrl = order.tracking_token
    ? `${window.location.origin}/track/${order.tracking_token}`
    : '';

  const handleCopy = () => {
    if (!trackingUrl) return;
    navigator.clipboard.writeText(trackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateTrackingLink(order.id);
      onOrderUpdated();
    } catch (err) {
      alert('Failed to generate tracking link');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleState = async (newState: boolean) => {
    setIsToggling(true);
    try {
      await toggleTracking(order.id, newState);
      onOrderUpdated();
    } catch (err) {
      alert('Failed to update tracking state');
    } finally {
      setIsToggling(false);
    }
  };

  const handleSendEmail = async () => {
    setIsSendingMail(true);
    try {
      await sendTrackingEmail(order.id);
      alert('Email sent successfully!');
    } catch (err) {
      alert('Failed to send tracking email');
    } finally {
      setIsSendingMail(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order #${order.orderId}`}>
      <div className="space-y-6">
        {/* ORDER INFORMATION */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold mb-3">
            <Package className="h-4 w-4 text-brand-600" />
            <span>ORDER INFORMATION</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Order ID</span>
              <span className="font-mono font-bold text-slate-900">{order.orderId}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Order Date</span>
              <span className="font-medium text-slate-900">
                {new Date(order.order_time).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Order Amount</span>
              <span className="font-bold text-slate-900">₹{order.total_amount}</span>
            </div>
          </div>
        </div>

        {/* CUSTOMER INFORMATION */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold mb-3">
            <User className="h-4 w-4 text-brand-600" />
            <span>CUSTOMER INFORMATION</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Full Name</span>
              <span className="font-medium text-slate-900">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Email Address</span>
              <span className="font-medium text-slate-900 break-all">{order.email}</span>
            </div>
          </div>
        </div>

        {/* DELIVERY INFORMATION */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold mb-3">
            <MapPin className="h-4 w-4 text-brand-600" />
            <span>DELIVERY INFORMATION</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="font-medium text-slate-900">{order.address}</p>
            <p className="text-slate-700">
              {order.city}, {order.state} - {order.pin}
            </p>
          </div>
        </div>

        {/* TRACKING INFORMATION */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-slate-800 font-semibold">
              <Truck className="h-4 w-4 text-brand-600" />
              <span>TRACKING INFORMATION</span>
            </div>
            {order.tracking_enabled ? (
              <Badge variant="success">Tracking Enabled</Badge>
            ) : (
              <Badge variant="warning">Tracking Disabled</Badge>
            )}
          </div>

          {order.tracking_token ? (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500">Tracking Token</span>
                <span className="font-mono font-bold text-slate-800">{order.tracking_token}</span>
              </div>

              <div>
                <span className="text-slate-500 block mb-1">Public Tracking Link</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={trackingUrl}
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-700 select-all"
                  />
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </Button>
                  <a href={trackingUrl} target="_blank" rel="noreferrer">
                    <Button variant="primary" size="sm">
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Open</span>
                    </Button>
                  </a>
                </div>
                <div className="pt-2 flex justify-end">
                  <Button variant="secondary" size="sm" onClick={handleSendEmail} isLoading={isSendingMail}>
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Tracking Email to Customer</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-slate-500 block">Current Status</span>
                  <span className="font-semibold text-brand-700">{order.currentStatusLabel}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Estimated Delivery</span>
                  <span className="font-semibold text-slate-800">{order.estimatedDelivery}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <p className="text-xs text-slate-500">No tracking link generated for this order yet.</p>
              <Button variant="primary" size="sm" onClick={handleGenerate} isLoading={isGenerating}>
                <Sparkles className="h-4 w-4" />
                <span>Generate Tracking Link</span>
              </Button>
            </div>
          )}
        </div>

        {/* CONTROLS & ACTIONS */}
        {order.tracking_token && (
          <div className="flex items-center justify-between pt-2">
            {order.tracking_enabled ? (
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleToggleState(false)}
                isLoading={isToggling}
              >
                <ShieldOff className="h-4 w-4" />
                <span>Disable Tracking</span>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleToggleState(true)}
                isLoading={isToggling}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Enable Tracking</span>
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
