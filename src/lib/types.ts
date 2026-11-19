export type Vendor = {
  _id: string;
  name: string;
  businessName?: string;
  image?: string | null;
  subscriptionPlan?: string;
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
