export enum UserRole {
  SUPER_ADMIN = "Super Admin",
  STAFF = "Staff",
}

export enum OrderStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  COMPLETED = "Completed",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

export enum ProductStatus {
  ACTIVE = "Active",
  DRAFT = "Draft",
  ARCHIVED = "Archived",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  status: "Active" | "Inactive";
  lastActive?: string;
}

export interface Category {
  id: string;
  name: string;
  productsCount: number;
  children?: Category[]; // Recursive structure
  parentId?: string | null;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  productsCount: number;
  status: "Active" | "Inactive";
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  imageUrl: string;
  sales: number;
  images?: string[];
  // New fields for Analytics
  costPrice?: number;
  avgDailySales?: number;
  lastSaleDate?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  date: string;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  totalOrders: number;
  totalSpent: number;
  status: "Active" | "Blocked";
  joinDate: string;
}

export interface SalesData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  profit: number;
  orders: number;
  [key: string]: string | number;
}

// New Interfaces for Reports
export interface TopSellingProduct {
  id: string;
  name: string;
  sku: string;
  quantitySold: number;
  revenue: number;
  percentage: number;
}
