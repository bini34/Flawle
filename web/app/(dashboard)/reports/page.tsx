"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  Area,
} from "recharts";
import {
  Download,
  TrendingUp,
  AlertCircle,
  Package,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronDown,
  Clock,
  XCircle,
} from "lucide-react";
import {
  REVENUE_DATA,
  CATEGORY_DATA,
  MOCK_PRODUCTS,
  MOCK_TOP_PRODUCTS,
} from "@/constants";
import { useToast, useTheme } from "@/components/Providers";

const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

interface SummaryCardProps {
  title: string;
  value: string;
  subValue?: string;
  trend: string;
  isPositive: boolean;
  icon: React.ElementType;
}
const SummaryCard = ({
  title,
  value,
  subValue,
  trend,
  isPositive,
  icon: Icon,
}: SummaryCardProps) => (
  <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800">
    <div className="mb-4 flex items-start justify-between">
      <div
        className={`rounded-2xl p-3 ${isPositive ? "bg-lime-50 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400" : "bg-neutral-50 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"}`}
      >
        <Icon size={22} />
      </div>
      <span
        className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold ${isPositive ? "bg-lime-100/50 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400" : "bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
      >
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </span>
    </div>
    <div>
      <p className="mb-1 text-sm font-semibold text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      <h3 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {value}
      </h3>
      {subValue && (
        <p className="mt-1 text-xs font-medium text-neutral-400">{subValue}</p>
      )}
    </div>
  </div>
);

const SalesTab = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <h3 className="mb-8 text-xl font-bold text-neutral-900 dark:text-white">
          Sales Performance
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_DATA}>
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? "#171717" : "#fff",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  padding: "12px",
                }}
                cursor={{ fill: isDarkMode ? "#262626" : "#f9fafb" }}
                itemStyle={{
                  color: isDarkMode ? "#e5e5e5" : "#171717",
                  fontWeight: 600,
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#71CD32"
                radius={[6, 6, 0, 0]}
                barSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Top 10 Best-Selling Products
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4 text-right">Qty Sold</th>
                <th className="px-6 py-4 text-right">Revenue</th>
                <th className="px-6 py-4 text-right">% Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {MOCK_TOP_PRODUCTS.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                >
                  <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 font-bold text-neutral-700 dark:text-neutral-200">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{product.sku}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    {product.quantitySold}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-neutral-900 dark:text-white">
                    {formatCurrency(product.revenue)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{product.percentage}%</span>
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-700">
                        <div
                          className="h-full rounded-full bg-lime-500"
                          style={{ width: `${product.percentage}%` }}
                        ></div>
                      </div>
                    </div>
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

const InventoryTab = () => {
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < 20);
  const outOfStockProducts = MOCK_PRODUCTS.filter((p) => p.stock === 0);
  const slowMovingProducts = MOCK_PRODUCTS.filter(
    (p) => (p.avgDailySales || 0) < 1
  );

  const calculateDaysLeft = (stock: number, avgSales: number) => {
    if (stock === 0) return 0;
    if (!avgSales || avgSales <= 0) return 999;
    return Math.round(stock / avgSales);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center gap-5 rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="rounded-2xl bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Low Stock Items
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
              {lowStockProducts.length}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Total Value
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
              $45,230
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-5 rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="rounded-2xl bg-lime-50 p-4 text-lime-600 dark:bg-lime-900/20 dark:text-lime-400">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
              Stock Turnover
            </p>
            <h3 className="mt-1 text-3xl font-extrabold text-neutral-900 dark:text-white">
              12.5%
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-3 border-b border-neutral-100 p-6 dark:border-neutral-700">
            <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/30">
              <XCircle size={18} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Out-of-Stock Items
            </h3>
          </div>
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Last Sale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {outOfStockProducts.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{p.sku}</td>
                  <td className="px-6 py-4 text-xs">
                    {p.lastSaleDate || "N/A"}
                  </td>
                </tr>
              ))}
              {outOfStockProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center">
                    No out of stock items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-3 border-b border-neutral-100 p-6 dark:border-neutral-700">
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-900/30">
              <Clock size={18} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Slow-Moving Items
            </h3>
          </div>
          <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
            <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Last Sale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {slowMovingProducts.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white">
                    {p.name}
                  </td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4 text-xs">
                    {p.lastSaleDate || "Never"}
                  </td>
                </tr>
              ))}
              {slowMovingProducts.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-center">
                    No slow moving items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
        <div className="border-b border-neutral-100 p-8 dark:border-neutral-700">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
            Low Stock Alert
          </h3>
        </div>
        <table className="w-full text-left text-sm text-neutral-500 dark:text-neutral-400">
          <thead className="bg-neutral-50 text-xs font-bold tracking-wider text-neutral-400 uppercase dark:bg-neutral-800">
            <tr>
              <th className="px-8 py-5">Product</th>
              <th className="px-8 py-5">SKU</th>
              <th className="px-8 py-5">Current Stock</th>
              <th className="px-8 py-5">Avg Daily Sales</th>
              <th className="px-8 py-5">Days Left</th>
              <th className="px-8 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
            {lowStockProducts.map((product) => {
              const daysLeft = calculateDaysLeft(
                product.stock,
                product.avgDailySales || 0
              );
              return (
                <tr
                  key={product.id}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50"
                >
                  <td className="px-8 py-5 font-bold text-neutral-900 dark:text-white">
                    {product.name}
                  </td>
                  <td className="px-8 py-5 font-medium">{product.sku}</td>
                  <td className="px-8 py-5 font-extrabold text-red-600 dark:text-red-400">
                    {product.stock}
                  </td>
                  <td className="px-8 py-5">{product.avgDailySales}</td>
                  <td className="px-8 py-5">
                    <span
                      className={`font-bold ${daysLeft < 7 ? "text-red-600" : "text-neutral-600 dark:text-neutral-300"}`}
                    >
                      {daysLeft > 365
                        ? "> 1 Year"
                        : daysLeft === 0
                          ? "0 Days"
                          : `${daysLeft} Days`}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      Low Stock
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RevenueTab = () => {
  const { isDarkMode } = useTheme();
  const COLORS = ["#71CD32", "#95DA66", "#B8E699", "#39951F"];

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              Profit vs Revenue
            </h3>
            <div className="flex gap-4 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-lime-500"></div> Revenue
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-neutral-900 dark:bg-white"></div>{" "}
                Profit
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRevBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71CD32" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#71CD32" stopOpacity={0.2} />
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
                  tickFormatter={(val) => `$${val}`}
                  tick={{ fill: "#a3a3a3", fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#171717" : "#fff",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    padding: "12px",
                  }}
                  itemStyle={{ fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="url(#colorRevBar)"
                  stroke="#71CD32"
                  strokeWidth={0}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke={isDarkMode ? "#fff" : "#171717"}
                  strokeWidth={3}
                  dot={{ r: 4, fill: isDarkMode ? "#fff" : "#171717" }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm transition-all dark:border-neutral-700 dark:bg-neutral-800">
          <h3 className="mb-8 text-xl font-bold text-neutral-900 dark:text-white">
            Revenue by Category
          </h3>
          <div className="flex min-h-[300px] flex-1 items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke={isDarkMode ? "#171717" : "#fff"}
                  strokeWidth={4}
                  cornerRadius={6}
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
                    border: "none",
                    fontWeight: 600,
                  }}
                  itemStyle={{ color: isDarkMode ? "#e5e5e5" : "#171717" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            {CATEGORY_DATA.map((item, idx) => (
              <div
                key={item.name}
                className="flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300"
              >
                <div
                  className="h-3.5 w-3.5 rounded-full ring-2 ring-neutral-100 dark:ring-neutral-700"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                ></div>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DateRangeSelector = ({
  onChange,
}: {
  onChange: (range: string) => void;
}) => {
  const [selectedRange, setSelectedRange] = useState("This Month");
  const [isCustom, setIsCustom] = useState(false);

  const ranges = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "Last 30 Days",
    "This Month",
    "Last Month",
    "Custom Range",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedRange(val);
    if (val === "Custom Range") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange(val);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Calendar
          className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-500"
          size={16}
        />
        <select
          className="cursor-pointer appearance-none rounded-xl border border-neutral-200 bg-white py-2.5 pr-8 pl-10 text-sm font-bold text-neutral-700 focus:ring-2 focus:ring-lime-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
          value={selectedRange}
          onChange={handleChange}
        >
          {ranges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500"
          size={14}
        />
      </div>

      {isCustom && (
        <div className="animate-fadeIn flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-2 py-1 dark:border-neutral-700 dark:bg-neutral-800">
          <input
            type="date"
            className="bg-transparent text-xs font-medium outline-none dark:text-white"
            onChange={() => onChange("Custom")}
          />
          <span className="text-neutral-400">-</span>
          <input
            type="date"
            className="bg-transparent text-xs font-medium outline-none dark:text-white"
            onChange={() => onChange("Custom")}
          />
        </div>
      )}
    </div>
  );
};

const Reports = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"sales" | "inventory" | "revenue">(
    "sales"
  );
  const [dateRange, setDateRange] = useState("This Month");

  useEffect(() => {
    console.log(`Fetching data for range: ${dateRange}`);
  }, [dateRange]);

  const convertArrayToCSV = (array: object[]) => {
    if (array.length === 0) return "";
    const header = Object.keys(array[0]).join(",");
    const rows = array.map((obj) => Object.values(obj).join(","));
    return [header, ...rows].join("\n");
  };

  const downloadCSV = (content: string, fileName: string) => {
    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    let dataToExport: object[] = [];
    let filename = "report.csv";

    if (activeTab === "sales") {
      dataToExport = MOCK_TOP_PRODUCTS;
      filename = `sales_report_${dateRange}.csv`;
    } else if (activeTab === "inventory") {
      dataToExport = MOCK_PRODUCTS.map(({ id, name, stock, status }) => ({
        id,
        name,
        stock,
        status,
      }));
      filename = `inventory_report_${dateRange}.csv`;
    } else {
      dataToExport = REVENUE_DATA;
      filename = `revenue_report_${dateRange}.csv`;
    }

    if (dataToExport.length > 0) {
      const csv = convertArrayToCSV(dataToExport);
      downloadCSV(csv, filename);
      showToast(`Exported ${filename}`, "success");
    } else {
      showToast("No data to export", "error");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Reports &amp; Analytics
          </h1>
          <p className="mt-2 font-medium text-neutral-500 dark:text-neutral-400">
            Deep dive into your business metrics.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <DateRangeSelector onChange={setDateRange} />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-bold text-neutral-700 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Revenue"
          value="$142,300"
          trend="12%"
          isPositive={true}
          icon={DollarSign}
        />
        <SummaryCard
          title="Total Orders"
          value="1,450"
          trend="5.4%"
          isPositive={true}
          icon={ShoppingBag}
        />
        <SummaryCard
          title="Avg Order Value"
          value="$98.15"
          trend="2.1%"
          isPositive={false}
          icon={Package}
        />
        <SummaryCard
          title="Total Profit"
          value="$54,200"
          subValue="Margin: 38%"
          trend="15.3%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <div className="flex gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("sales")}
            className={`border-b-2 pb-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "sales" ? "border-lime-500 text-lime-600 dark:text-lime-400" : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}`}
          >
            Sales Reports
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`border-b-2 pb-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "inventory" ? "border-lime-500 text-lime-600 dark:text-lime-400" : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}`}
          >
            Inventory Status
          </button>
          <button
            onClick={() => setActiveTab("revenue")}
            className={`border-b-2 pb-4 text-sm font-bold whitespace-nowrap transition-colors ${activeTab === "revenue" ? "border-lime-500 text-lime-600 dark:text-lime-400" : "border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}`}
          >
            Revenue Insights
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "sales" && <SalesTab />}
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "revenue" && <RevenueTab />}
      </div>
    </div>
  );
};

export default Reports;
