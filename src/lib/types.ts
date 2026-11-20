export type Vendor = {
  _id: string;
  name: string;
  businessName?: string;
  image?: string | null;
  subscriptionPlan?: string;
};

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'cancelled';

type Person = {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  businessName?: string;
};

export type Booking = {
  _id: string;
  serviceId: string;
  vendorId: string;
  customerId: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
  service?: { _id: string; serviceName: string; category: string; images: string[] };
  vendor?: Person;
  customer?: Person;
};

export type AdminOverview = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
};

export type Service = {
  _id: string;
  vendorId: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  isActive: boolean;
  createdAt: string;
  vendor: Vendor;
};
