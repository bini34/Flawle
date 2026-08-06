'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_ORDERS } from '@/constants';
import { ChevronLeft, Printer, Mail, MapPin, CreditCard, ChevronDown, Check } from 'lucide-react';
import { useToast } from '@/components/Providers';
import { OrderStatus } from '@/types';

const OrderDetails = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { showToast } = useToast();

  const orderId = id ? (id.startsWith('#') ? id : `#${id}`) : null;
  const initialOrder = MOCK_ORDERS.find(o => o.id === orderId) || MOCK_ORDERS[0];

  const [order, setOrder] = useState(initialOrder);
  const [note, setNote] = useState('');
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const handleStatusChange = (newStatus: OrderStatus) => {
     setOrder(prev => ({ ...prev, status: newStatus }));
     showToast(`Order status updated to ${newStatus}`, 'success');
     setIsStatusMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveNote = () => {
    if (!note) return;
    showToast("Internal note saved", "success");
    setNote('');
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles =
      status === OrderStatus.ACCEPTED ? 'bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400' :
      status === OrderStatus.PENDING ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
      status === OrderStatus.COMPLETED ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
      status === OrderStatus.REJECTED ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
      'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300';

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
        <div className="flex items-center gap-4">
            <Link href="/orders" className="p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-xl text-neutral-500 dark:text-neutral-400 transition-colors bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">Order {order.id}</h1>
                  <StatusBadge status={order.status} />
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">{order.date} at 10:24 AM</p>
            </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-3">
            <button onClick={handlePrint} className="p-3 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors bg-white dark:bg-neutral-800 shadow-sm">
              <Printer size={20} />
            </button>

            <div className="relative">
              <button
                  onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                  className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 text-white rounded-xl text-sm font-bold shadow-lg shadow-neutral-900/10 dark:shadow-none transition-all flex items-center gap-2"
              >
                Change Status
                <ChevronDown size={16} />
              </button>

              {isStatusMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsStatusMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-100 dark:border-neutral-700 z-20 overflow-hidden animate-slideUp">
                    <div className="p-2 space-y-1">
                      {Object.values(OrderStatus).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-colors flex justify-between items-center ${
                            order.status === status
                              ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400 font-bold'
                              : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 font-medium'
                          }`}
                        >
                          {status}
                          {order.status === status && <Check size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm overflow-hidden transition-all">
            <div className="p-8 border-b border-neutral-100 dark:border-neutral-700">
               <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Order Items</h2>
            </div>
            <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
               <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-xs uppercase text-neutral-400 font-bold tracking-wider">
                 <tr>
                   <th className="px-8 py-5">Product</th>
                   <th className="px-8 py-5 text-center">Qty</th>
                   <th className="px-8 py-5 text-right">Total</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
                 <tr>
                   <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex-shrink-0"></div>
                        <div>
                           <p className="font-bold text-neutral-900 dark:text-white">Wireless Headphones Pro</p>
                           <p className="text-xs text-neutral-400 font-medium mt-0.5">Electronics</p>
                        </div>
                     </div>
                   </td>
                   <td className="px-8 py-5 text-center font-medium">2</td>
                   <td className="px-8 py-5 text-right font-bold text-neutral-900 dark:text-white">$240.00</td>
                 </tr>
                 <tr>
                   <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex-shrink-0"></div>
                        <div>
                           <p className="font-bold text-neutral-900 dark:text-white">Smart Watch Series 5</p>
                           <p className="text-xs text-neutral-400 font-medium mt-0.5">Wearables</p>
                        </div>
                     </div>
                   </td>
                   <td className="px-8 py-5 text-center font-medium">1</td>
                   <td className="px-8 py-5 text-right font-bold text-neutral-900 dark:text-white">$350.00</td>
                 </tr>
               </tbody>
            </table>
            <div className="p-8 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50">
               <div className="flex justify-between mb-3 text-sm">
                 <span className="text-neutral-500 dark:text-neutral-400 font-medium">Subtotal</span>
                 <span className="font-bold text-neutral-900 dark:text-white">$590.00</span>
               </div>
               <div className="flex justify-between mb-3 text-sm">
                 <span className="text-neutral-500 dark:text-neutral-400 font-medium">Shipping</span>
                 <span className="font-bold text-neutral-900 dark:text-white">$10.00</span>
               </div>
               <div className="flex justify-between mb-3 text-sm">
                 <span className="text-neutral-500 dark:text-neutral-400 font-medium">Tax</span>
                 <span className="font-bold text-neutral-900 dark:text-white">$59.00</span>
               </div>
               <div className="flex justify-between pt-5 border-t border-neutral-200 dark:border-neutral-700 mt-5 text-xl font-extrabold text-neutral-900 dark:text-white">
                 <span>Total</span>
                 <span>${order.total.toLocaleString()}</span>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 transition-all">
             <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-8">Order Timeline</h2>
             <div className="space-y-8 relative pl-6 border-l-2 border-neutral-100 dark:border-neutral-700 ml-2">
               <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-lime-500 rounded-full border-4 border-white dark:border-neutral-800 shadow-sm"></div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">Order Placed</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">{order.date}, 10:24 AM</p>
               </div>
               <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-lime-500 rounded-full border-4 border-white dark:border-neutral-800 shadow-sm"></div>
                  <h4 className="text-base font-bold text-neutral-900 dark:text-white">Payment Confirmed</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-medium">{order.date}, 10:26 AM</p>
               </div>
               <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-neutral-200 dark:bg-neutral-600 rounded-full border-4 border-white dark:border-neutral-800"></div>
                  <h4 className="text-base font-bold text-neutral-400 dark:text-neutral-500">Processing</h4>
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 transition-all">
              <h2 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">Customer Info</h2>
              <div className="flex items-center gap-4 mb-8">
                 <img src={order.customerAvatar} alt="" className="w-14 h-14 rounded-full ring-4 ring-neutral-50 dark:ring-neutral-700" />
                 <div>
                    <p className="font-bold text-neutral-900 dark:text-white text-lg">{order.customerName}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Customer since 2023</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-400"><Mail size={18} /></div>
                    {order.customerEmail}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300 font-medium">
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-400"><MapPin size={18} /></div>
                    456 Park Avenue, NY 10011
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 transition-all">
              <h2 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">Payment Info</h2>
              <div className="flex items-center gap-4 mb-2">
                 <div className="p-3 bg-neutral-50 dark:bg-neutral-700 rounded-xl border border-neutral-100 dark:border-neutral-600">
                    <CreditCard size={24} className="text-neutral-600 dark:text-neutral-300" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-neutral-900 dark:text-white">Mastercard **** 4582</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Payment Verified</p>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 shadow-sm p-8 transition-all">
              <h2 className="text-xs font-extrabold text-neutral-400 uppercase tracking-widest mb-6">Notes</h2>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full text-sm border-neutral-200 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-xl focus:ring-2 focus:ring-lime-500 outline-none p-3 border font-medium placeholder-neutral-400"
                rows={3}
                placeholder="Add internal note..."
              ></textarea>
              <button
                onClick={handleSaveNote}
                disabled={!note}
                className="mt-4 w-full text-xs font-bold bg-neutral-50 dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-200 py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                Save Note
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
