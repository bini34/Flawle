'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/constants';
import { Order, OrderStatus } from '@/types';
import { MoreHorizontal, Download, Plus, X, Trash2, User, CreditCard } from 'lucide-react';
import { useToast } from '@/components/Providers';

const Orders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeStatus, setActiveStatus] = useState('All Status');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrderItems, setNewOrderItems] = useState<{productId: string, qty: number, price: number}[]>([
    { productId: '', qty: 1, price: 0 }
  ]);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.COMPLETED);

  const filteredOrders = activeStatus === 'All Status'
    ? orders
    : orders.filter(o => o.status === activeStatus);

  const handleExport = () => {
    const headers = ['Order ID', 'Customer', 'Date', 'Total', 'Status'];
    const rows = filteredOrders.map(o => [o.id, o.customerName, o.date, o.total, o.status]);
    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Exported Orders successfully", "success");
  };

  const handleAddItem = () => {
    setNewOrderItems([...newOrderItems, { productId: '', qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...newOrderItems];
    updated.splice(index, 1);
    setNewOrderItems(updated);
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    const updated = [...newOrderItems];
    updated[index].productId = productId;
    updated[index].price = product ? product.price : 0;
    setNewOrderItems(updated);
  };

  const handleQtyChange = (index: number, qty: number) => {
    const updated = [...newOrderItems];
    updated[index].qty = qty > 0 ? qty : 1;
    setNewOrderItems(updated);
  };

  const calculateTotal = () => {
    return newOrderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name) {
      showToast("Customer name is required", "error");
      return;
    }

    if (newOrderItems.some(item => !item.productId)) {
      showToast("Please select products for all rows", "error");
      return;
    }

    const totalAmount = calculateTotal();
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newOrder: Order = {
      id: `#${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email || 'walk-in@store.com',
      customerAvatar: `https://ui-avatars.com/api/?name=${customerInfo.name}&background=random`,
      date: dateStr,
      total: totalAmount,
      status: orderStatus,
      paymentMethod: paymentMethod,
      items: newOrderItems.reduce((acc, item) => acc + item.qty, 0)
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    showToast("Manual order created successfully", "success");

    setCustomerInfo({ name: '', email: '' });
    setNewOrderItems([{ productId: '', qty: 1, price: 0 }]);
    setPaymentMethod('Cash');
    setOrderStatus(OrderStatus.COMPLETED);
  };

  return (
    <div className="space-y-8 relative">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Order Management</h1>
           <p className="text-neutral-500 dark:text-neutral-400 mt-2 font-medium">View and manage customer orders.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none"
          >
            <Plus size={18} />
            New Order
          </button>
          <button
            onClick={handleExport}
            className="border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
        <div className="p-5 border-b border-neutral-100 dark:border-neutral-700 flex gap-4 overflow-x-auto">
           {['All Status', 'Pending', 'Accepted', 'Completed', 'Rejected'].map(status => (
             <button
               key={status}
               onClick={() => setActiveStatus(status)}
               className={`px-5 py-2 text-sm rounded-full font-bold transition-all whitespace-nowrap
                 ${activeStatus === status
                   ? 'bg-neutral-900 text-white shadow-md shadow-neutral-900/10 dark:bg-white dark:text-neutral-900'
                   : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700'}`}
             >
               {status}
             </button>
           ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-xs uppercase text-neutral-400 font-bold tracking-wider">
              <tr>
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">{order.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Image src={order.customerAvatar} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="text-neutral-900 dark:text-white font-bold">{order.customerName}</p>
                          <p className="text-xs text-neutral-400 font-medium">{order.customerEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium">{order.date}</td>
                    <td className="px-8 py-5 font-medium">{order.items} items</td>
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">${order.total.toLocaleString()}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                        ${order.status === 'Accepted' ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' :
                          order.status === 'Pending' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                          order.status === 'Completed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                          order.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                          'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <Link href={`/orders/${order.id.replace('#','')}`} className="px-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-xl text-xs font-bold hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center gap-2 w-fit transition-colors">
                        Details <MoreHorizontal size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={7} className="text-center py-12 text-neutral-500 dark:text-neutral-400 font-medium">No orders found with this status.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-neutral-200 dark:border-neutral-700">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800">
              <div>
                <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Create Custom Order</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">For in-person or manual phone orders.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <User size={18} className="text-lime-500" />
                  <h3>Customer Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5">Customer Name</label>
                    <input required value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium text-sm" placeholder="e.g. Walk-in Customer" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5">Email (Optional)</label>
                    <input type="email" value={customerInfo.email} onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})} className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium text-sm" placeholder="email@example.com" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                      <CreditCard size={18} className="text-lime-500" />
                      <h3>Order Items</h3>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-3 text-xs font-bold text-neutral-400 uppercase tracking-wider px-1">
                       <div className="col-span-6">Product</div>
                       <div className="col-span-2">Price</div>
                       <div className="col-span-2">Qty</div>
                       <div className="col-span-2 text-right">Action</div>
                    </div>

                    {newOrderItems.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-neutral-50 dark:bg-neutral-700/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-700">
                         <div className="col-span-6">
                            <select required value={item.productId} onChange={(e) => handleProductChange(idx, e.target.value)} className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-500 dark:text-white">
                               <option value="">Select Product...</option>
                               {MOCK_PRODUCTS.map(p => (
                                 <option key={p.id} value={p.id}>{p.name}</option>
                               ))}
                            </select>
                         </div>
                         <div className="col-span-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">${item.price.toFixed(2)}</div>
                         <div className="col-span-2">
                            <input type="number" min="1" value={item.qty} onChange={(e) => handleQtyChange(idx, parseInt(e.target.value))} className="w-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-500 dark:text-white" />
                         </div>
                         <div className="col-span-2 text-right">
                           {newOrderItems.length > 1 && (
                             <button type="button" onClick={() => handleRemoveItem(idx)} className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                               <Trash2 size={16} />
                             </button>
                           )}
                         </div>
                      </div>
                    ))}

                    <button type="button" onClick={handleAddItem} className="text-sm font-bold text-lime-600 hover:text-lime-700 dark:text-lime-400 flex items-center gap-1 mt-2">
                       <Plus size={16} /> Add Another Item
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                 <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5">Payment Method</label>
                      <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium text-sm">
                         <option>Cash</option>
                         <option>Credit Card (Terminal)</option>
                         <option>Bank Transfer</option>
                         <option>Mobile Payment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1.5">Order Status</label>
                      <select value={orderStatus} onChange={e => setOrderStatus(e.target.value as OrderStatus)} className="w-full px-4 py-2.5 border border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none transition-all font-medium text-sm">
                         <option value={OrderStatus.COMPLETED}>Completed</option>
                         <option value={OrderStatus.ACCEPTED}>Accepted</option>
                         <option value={OrderStatus.PENDING}>Pending</option>
                      </select>
                    </div>
                 </div>

                 <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-2xl space-y-3">
                    <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                       <span>Subtotal</span><span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                       <span>Tax (0%)</span><span>$0.00</span>
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 flex justify-between text-xl font-extrabold text-neutral-900 dark:text-white">
                       <span>Total</span><span>${calculateTotal().toFixed(2)}</span>
                    </div>
                 </div>
              </div>
            </form>

            <div className="p-6 border-t border-neutral-100 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex gap-4">
               <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl font-bold transition-colors">Cancel</button>
               <button onClick={handleCreateOrder} className="flex-1 px-4 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl font-bold transition-all shadow-lg shadow-neutral-900/10 dark:shadow-none">Complete Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
