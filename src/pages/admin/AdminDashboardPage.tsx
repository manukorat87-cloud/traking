import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { OrdersTable } from '../../components/admin/OrdersTable';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import { fetchDashboardMetrics, fetchOrders, generateTrackingLink, sendTrackingEmail } from '../../services/api';
import { DashboardMetrics, OrderItem } from '../../types';
import { Button } from '../../components/ui/Button';

export const AdminDashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [recentOrders, setRecentOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadData = async (search = searchQuery, status = statusFilter) => {
    setIsLoading(true);
    try {
      const [m, o] = await Promise.all([
        fetchDashboardMetrics(),
        fetchOrders({ page: 1, limit: 5, search, status }),
      ]);
      setMetrics(m);
      setRecentOrders(o.orders);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerateTracking = async (order: OrderItem) => {
    try {
      await generateTrackingLink(order.id);
      loadData();
    } catch (err) {
      alert('Failed to generate tracking link');
    }
  };

  const handleSendEmail = async (order: OrderItem) => {
    try {
      await sendTrackingEmail(order.id);
      alert('Email sent successfully!');
    } catch (err) {
      alert('Failed to send tracking email');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Overview Dashboard</h2>
            <p className="text-sm text-slate-500 mt-1">
              Live statistics calculated from ShopifyStore Orders collection.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={loadData} isLoading={isLoading}>
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Link to="/admin/orders">
              <Button variant="primary" size="sm">
                <Package className="h-4 w-4" />
                <span>View All Orders</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Stats */}
        {metrics && <DashboardStats metrics={metrics} />}

        {/* Recent Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-brand-600" />
              <span>Recent Orders</span>
            </h3>
            <Link to="/admin/orders" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1">
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <OrdersTable
            orders={recentOrders}
            pagination={{ page: 1, totalPages: 1, total: recentOrders.length }}
            onPageChange={() => {}}
            onSearchChange={(query) => {
              setSearchQuery(query);
              loadData(query, statusFilter);
            }}
            onStatusFilterChange={(status) => {
              setStatusFilter(status);
              loadData(searchQuery, status);
            }}
            onViewOrder={(order) => {
              setSelectedOrder(order);
              setIsModalOpen(true);
            }}
            onGenerateTracking={handleGenerateTracking}
            onSendEmail={handleSendEmail}
            isLoading={isLoading}
          />
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderUpdated={loadData}
      />
    </AdminLayout>
  );
};
