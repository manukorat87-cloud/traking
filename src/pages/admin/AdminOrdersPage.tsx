import React, { useEffect, useState, useCallback } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { OrdersTable } from '../../components/admin/OrdersTable';
import { OrderDetailModal } from '../../components/admin/OrderDetailModal';
import { fetchOrders, generateTrackingLink } from '../../services/api';
import { OrderItem } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadOrders = useCallback(async (page = 1, search = searchQuery, status = statusFilter) => {
    setIsLoading(true);
    try {
      const res = await fetchOrders({
        page,
        limit: 10,
        search,
        status,
      });
      setOrders(res.orders);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to load orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    loadOrders(1);
  }, [loadOrders]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    loadOrders(1, query, statusFilter);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    loadOrders(1, searchQuery, status);
  };

  const handlePageChange = (newPage: number) => {
    loadOrders(newPage);
  };

  const handleGenerateTracking = async (order: OrderItem) => {
    try {
      await generateTrackingLink(order.id);
      loadOrders(pagination.page);
    } catch (err) {
      alert('Failed to generate tracking link');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">ShopifyStore Orders</h2>
          <p className="text-sm text-slate-500 mt-1">
            Displaying real customer orders from your existing MongoDB collection.
          </p>
        </div>

        <OrdersTable
          orders={orders}
          pagination={pagination}
          onPageChange={handlePageChange}
          onSearchChange={handleSearchChange}
          onStatusFilterChange={handleStatusFilterChange}
          onViewOrder={(order) => {
            setSelectedOrder(order);
            setIsModalOpen(true);
          }}
          onGenerateTracking={handleGenerateTracking}
          isLoading={isLoading}
        />
      </div>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderUpdated={() => loadOrders(pagination.page)}
      />
    </AdminLayout>
  );
};
