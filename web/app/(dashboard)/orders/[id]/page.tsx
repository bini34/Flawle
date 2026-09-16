"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_ORDERS } from "@/constants";
import {
  ChevronLeft,
  Printer,
  Mail,
  MapPin,
  CreditCard,
  ChevronDown,
  Check,
} from "lucide-react";
import { useToast } from "@/components/Providers";
import { OrderStatus } from "@/types";

const OrderDetails = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { showToast } = useToast();

  const orderId = id ? (id.startsWith("#") ? id : `#${id}`) : null;
  const initialOrder =
    MOCK_ORDERS.find((o) => o.id === orderId) || MOCK_ORDERS[0];

  const [order, setOrder] = useState(initialOrder);
  const [note, setNote] = useState("");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    showToast(`Order status updated to ${newStatus}`, "success");
    setIsStatusMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveNote = () => {
    if (!note) return;
    showToast("Internal note saved", "success");
    setNote("");
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const styles =
      status === OrderStatus.ACCEPTED
        ? "bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400"
        : status === OrderStatus.PENDING
          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"
          : status === OrderStatus.COMPLETED
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
            : status === OrderStatus.REJECTED
              ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
              : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300";

    return (
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-20">
      <div className="mb-4 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/orders"
            className="rounded-xl border border-neutral-100 bg-white p-3 text-neutral-500 shadow-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                Order {order.id}
              </h1>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">
              {order.date} at 10:24 AM
            </p>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="rounded-xl border border-neutral-200 bg-white p-3 text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <Printer size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
              className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
            >
              Change Status
              <ChevronDown size={16} />
            </button>

            {isStatusMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsStatusMenuOpen(false)}
                ></div>
                <div className="animate-slideUp absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="space-y-1 p-2">
                    {Object.values(OrderStatus).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                          order.status === status
                            ? "bg-lime-50 font-bold text-lime-700 dark:bg-lime-900/20 dark:text-lime-400"
                            : "font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-700"
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Order Items
              </h2>
            </div>
            <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
              <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800/50">
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
                      <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-neutral-100 dark:bg-neutral-700"></div>
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">
                          Wireless Headphones Pro
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-neutral-400">
                          Electronics
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center font-medium">2</td>
                  <td className="px-8 py-5 text-right font-bold text-neutral-900 dark:text-white">
                    $240.00
                  </td>
                </tr>
                <tr>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-neutral-100 dark:bg-neutral-700"></div>
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-white">
                          Smart Watch Series 5
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-neutral-400">
                          Wearables
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center font-medium">1</td>
                  <td className="px-8 py-5 text-right font-bold text-neutral-900 dark:text-white">
                    $350.00
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="border-t border-neutral-100 bg-neutral-50/50 p-8 dark:border-neutral-700 dark:bg-neutral-800/50">
              <div className="mb-3 flex justify-between text-sm">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  Subtotal
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  $590.00
                </span>
              </div>
              <div className="mb-3 flex justify-between text-sm">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  Shipping
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  $10.00
                </span>
              </div>
              <div className="mb-3 flex justify-between text-sm">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  Tax
                </span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  $59.00
                </span>
              </div>
              <div className="mt-5 flex justify-between border-t border-neutral-200 pt-5 text-xl font-extrabold text-neutral-900 dark:border-neutral-700 dark:text-white">
                <span>Total</span>
                <span>${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-8 text-xl font-bold text-neutral-900 dark:text-white">
              Order Timeline
            </h2>
            <div className="relative ml-2 space-y-8 border-l-2 border-neutral-100 pl-6 dark:border-neutral-700">
              <div className="relative">
                <div className="absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-lime-500 shadow-sm dark:border-neutral-800"></div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  Order Placed
                </h4>
                <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {order.date}, 10:24 AM
                </p>
              </div>
              <div className="relative">
                <div className="absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-lime-500 shadow-sm dark:border-neutral-800"></div>
                <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                  Payment Confirmed
                </h4>
                <p className="mt-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {order.date}, 10:26 AM
                </p>
              </div>
              <div className="relative">
                <div className="absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4 border-white bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-600"></div>
                <h4 className="text-base font-bold text-neutral-400 dark:text-neutral-500">
                  Processing
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-6 text-xs font-extrabold tracking-widest text-neutral-400 uppercase">
              Customer Info
            </h2>
            <div className="mb-8 flex items-center gap-4">
              <Image
                src={order.customerAvatar}
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 rounded-full ring-4 ring-neutral-50 dark:ring-neutral-700"
              />
              <div>
                <p className="text-lg font-bold text-neutral-900 dark:text-white">
                  {order.customerName}
                </p>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Customer since 2023
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <div className="rounded-lg bg-neutral-50 p-2 text-neutral-400 dark:bg-neutral-700">
                  <Mail size={18} />
                </div>
                {order.customerEmail}
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                <div className="rounded-lg bg-neutral-50 p-2 text-neutral-400 dark:bg-neutral-700">
                  <MapPin size={18} />
                </div>
                456 Park Avenue, NY 10011
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-6 text-xs font-extrabold tracking-widest text-neutral-400 uppercase">
              Payment Info
            </h2>
            <div className="mb-2 flex items-center gap-4">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-3 dark:border-neutral-600 dark:bg-neutral-700">
                <CreditCard
                  size={24}
                  className="text-neutral-600 dark:text-neutral-300"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">
                  Mastercard **** 4582
                </p>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Payment Verified
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
            <h2 className="mb-6 text-xs font-extrabold tracking-widest text-neutral-400 uppercase">
              Notes
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 p-3 text-sm font-medium placeholder-neutral-400 outline-none focus:ring-2 focus:ring-lime-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              rows={3}
              placeholder="Add internal note..."
            ></textarea>
            <button
              onClick={handleSaveNote}
              disabled={!note}
              className="mt-4 w-full rounded-xl bg-neutral-50 py-3 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-100 disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
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
