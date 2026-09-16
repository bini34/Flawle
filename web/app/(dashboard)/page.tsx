"use client";

import React from "react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingCart,
  Box,
  Activity,
  Download,
} from "lucide-react";
import Link from "next/link";
import { REVENUE_DATA, CATEGORY_DATA, MOCK_ORDERS } from "@/constants";
import { useToast, useTheme } from "@/components/Providers";

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
  subtext?: string;
}
const StatCard = ({
  title,
  value,
  trend,
  isPositive,
  icon: Icon,
  subtext,
}: StatCardProps) => (
  <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
    <div className="mb-6 flex items-start justify-between">
      <div>
        <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
          {title}
        </p>
        <h3 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-white">
          {value}
        </h3>
      </div>
      <div
        className={`rounded-2xl p-3.5 ${isPositive ? "bg-lime-50 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400" : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"}`}
      >
        <Icon size={22} />
      </div>
    </div>
    <div className="flex items-center gap-3 text-sm">
      <span
        className={`flex items-center gap-1 rounded-lg px-2 py-1 font-bold ${isPositive ? "bg-lime-100/50 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400" : "bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {trend}
      </span>
      <span className="font-medium text-neutral-400">{subtext}</span>
    </div>
  </div>
);

const Dashboard = () => {
  const COLORS = ["#71CD32", "#95DA66", "#B8E699", "#39951F"];
  const { showToast } = useToast();
  const { isDarkMode } = useTheme();

  const handleDownloadReport = () => {
    showToast("Downloading Dashboard Report...", "success");
    setTimeout(() => {
      console.log("Report downloaded");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Here is what&apos;s happening with your store today.
          </p>
        </div>
        <div className="flex gap-4">
          <select className="cursor-pointer rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 focus:ring-2 focus:ring-lime-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-neutral-900/10 transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:shadow-none dark:hover:bg-neutral-200"
          >
            <Download size={18} />
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$24,012.00"
          trend="+12.5%"
          isPositive={true}
          icon={DollarSign}
          subtext="vs last month"
        />
        <StatCard
          title="Total Orders"
          value="1,403"
          trend="+8.2%"
          isPositive={true}
          icon={ShoppingCart}
          subtext="vs last month"
        />
        <StatCard
          title="Total Products"
          value="245"
          trend="-1.2%"
          isPositive={false}
          icon={Box}
          subtext="added this month"
        />
        <StatCard
          title="Monthly Sales"
          value="892"
          trend="+4.3%"
          isPositive={true}
          icon={Activity}
          subtext="vs last month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Area Chart */}
        <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all lg:col-span-2 dark:border-neutral-700 dark:bg-neutral-800">
          <h2 className="mb-8 text-xl font-bold text-neutral-900 dark:text-white">
            Revenue Analytics
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71CD32" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#71CD32" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDarkMode ? "#262626" : "#f5f5f5"}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#171717" : "#fff",
                    borderRadius: "16px",
                    border: isDarkMode
                      ? "1px solid #262626"
                      : "1px solid #e5e5e5",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: "#71CD32", fontWeight: 700 }}
                  labelStyle={{
                    color: isDarkMode ? "#e5e5e5" : "#171717",
                    fontWeight: 600,
                    marginBottom: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#71CD32"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Pie Chart */}
        <div className="flex flex-col rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">
            Sales by Category
          </h2>
          <div className="relative flex min-h-[280px] flex-1 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={6}
                  dataKey="value"
                  stroke={isDarkMode ? "#171717" : "#fff"}
                  strokeWidth={4}
                  cornerRadius={8}
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#171717" : "#fff",
                    borderRadius: "12px",
                    border: isDarkMode
                      ? "1px solid #262626"
                      : "1px solid #e5e5e5",
                    fontWeight: 600,
                  }}
                  itemStyle={{ color: isDarkMode ? "#e5e5e5" : "#171717" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                85%
              </span>
              <span className="text-sm font-medium text-neutral-400">
                Growth
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-4">
            {CATEGORY_DATA.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-3">
                <div
                  className="h-3.5 w-3.5 rounded-full shadow-sm ring-2 ring-white dark:ring-neutral-800"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></div>
                <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table Preview */}
      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="flex items-center justify-between border-b border-neutral-100 p-8 dark:border-neutral-700">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
            Recent Orders
          </h2>
          <Link
            href="/orders"
            className="text-sm font-bold text-lime-600 transition-colors hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800/50">
              <tr>
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Amount</th>
                <th className="px-8 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {MOCK_ORDERS.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                >
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                    {order.id}
                  </td>
                  <td className="flex items-center gap-4 px-8 py-5">
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
                  </td>
                  <td className="px-8 py-5 font-medium">{order.date}</td>
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
                              : "bg-neutral-100 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
