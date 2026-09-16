"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_ORDERS, MOCK_PRODUCTS } from "@/constants";
import { Order, OrderStatus } from "@/types";
import {
  MoreHorizontal,
  Download,
  Plus,
  X,
  Trash2,
  User,
  CreditCard,
} from "lucide-react";
import { useToast } from "@/components/Providers";

const Orders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [activeStatus, setActiveStatus] = useState("All Status");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrderItems, setNewOrderItems] = useState<
    { productId: string; qty: number; price: number }[]
  >([{ productId: "", qty: 1, price: 0 }]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    OrderStatus.COMPLETED
  );

  const filteredOrders =
    activeStatus === "All Status"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  const handleExport = () => {
    const headers = ["Order ID", "Customer", "Date", "Total", "Status"];
    const rows = filteredOrders.map((o) => [
      o.id,
      o.customerName,
      o.date,
      o.total,
      o.status,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

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
    setNewOrderItems([...newOrderItems, { productId: "", qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    const updated = [...newOrderItems];
    updated.splice(index, 1);
    setNewOrderItems(updated);
  };

  const handleProductChange = (index: number, productId: string) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
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
    return newOrderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerInfo.name) {
      showToast("Customer name is required", "error");
      return;
    }

    if (newOrderItems.some((item) => !item.productId)) {
      showToast("Please select products for all rows", "error");
      return;
    }

    const totalAmount = calculateTotal();
    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const newOrder: Order = {
      id: `#${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      customerName: customerInfo.name,
      customerEmail: customerInfo.email || "walk-in@store.com",
      customerAvatar: `https://ui-avatars.com/api/?name=${customerInfo.name}&background=random`,
      date: dateStr,
      total: totalAmount,
      status: orderStatus,
      paymentMethod: paymentMethod,
      items: newOrderItems.reduce((acc, item) => acc + item.qty, 0),
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
    showToast("Manual order created successfully", "success");

    setCustomerInfo({ name: "", email: "" });
    setNewOrderItems([{ productId: "", qty: 1, price: 0 }]);
    setPaymentMethod("Cash");
    setOrderStatus(OrderStatus.COMPLETED);
  };

  return (
    <div className="relative space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Order Management
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            View and manage customer orders.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
          >
            <Plus size={18} />
            New Order
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex gap-4 overflow-x-auto border-b border-neutral-100 p-5 dark:border-neutral-700">
          {["All Status", "Pending", "Accepted", "Completed", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`rounded-full px-5 py-2 text-sm font-bold whitespace-nowrap transition-all ${
                  activeStatus === status
                    ? "bg-neutral-900 text-white shadow-md shadow-neutral-900/10 dark:bg-white dark:text-neutral-900"
                    : "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-700"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800/50">
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
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                  >
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <Image
                          src={order.customerAvatar}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-white">
                            {order.customerName}
                          </p>
                          <p className="text-xs font-medium text-neutral-400">
                            {order.customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium">{order.date}</td>
                    <td className="px-8 py-5 font-medium">
                      {order.items} items
                    </td>
                    <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                          order.status === "Accepted"
                            ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400"
                            : order.status === "Pending"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
                              : order.status === "Completed"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                                : order.status === "Rejected"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <Link
                        href={`/orders/${order.id.replace("#", "")}`}
                        className="flex w-fit items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700"
                      >
                        Details <MoreHorizontal size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center font-medium text-neutral-500 dark:text-neutral-400"
                  >
                    No orders found with this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
            <div className="flex items-center justify-between border-b border-neutral-100 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  Create Custom Order
                </h2>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  For in-person or manual phone orders.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleCreateOrder}
              className="flex-1 space-y-8 overflow-y-auto p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                  <User size={18} className="text-lime-500" />
                  <h3>Customer Details</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      Customer Name
                    </label>
                    <input
                      required
                      value={customerInfo.name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="e.g. Walk-in Customer"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                    <CreditCard size={18} className="text-lime-500" />
                    <h3>Order Items</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-3 px-1 text-xs font-bold tracking-wider text-neutral-400 uppercase">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Qty</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>

                  {newOrderItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-700/50"
                    >
                      <div className="col-span-6">
                        <select
                          required
                          value={item.productId}
                          onChange={(e) =>
                            handleProductChange(idx, e.target.value)
                          }
                          className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                        >
                          <option value="">Select Product...</option>
                          {MOCK_PRODUCTS.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">
                        ${item.price.toFixed(2)}
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            handleQtyChange(idx, parseInt(e.target.value))
                          }
                          className="w-full rounded-lg border border-neutral-200 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                        />
                      </div>
                      <div className="col-span-2 text-right">
                        {newOrderItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="mt-2 flex items-center gap-1 text-sm font-bold text-lime-600 hover:text-lime-700 dark:text-lime-400"
                  >
                    <Plus size={16} /> Add Another Item
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 border-t border-neutral-100 pt-4 md:grid-cols-2 dark:border-neutral-700">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    >
                      <option>Cash</option>
                      <option>Credit Card (Terminal)</option>
                      <option>Bank Transfer</option>
                      <option>Mobile Payment</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      Order Status
                    </label>
                    <select
                      value={orderStatus}
                      onChange={(e) =>
                        setOrderStatus(e.target.value as OrderStatus)
                      }
                      className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                    >
                      <option value={OrderStatus.COMPLETED}>Completed</option>
                      <option value={OrderStatus.ACCEPTED}>Accepted</option>
                      <option value={OrderStatus.PENDING}>Pending</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-900/50">
                  <div className="flex justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    <span>Tax (0%)</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-200 pt-3 text-xl font-extrabold text-neutral-900 dark:border-neutral-700 dark:text-white">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </form>

            <div className="flex gap-4 border-t border-neutral-100 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-xl px-4 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
