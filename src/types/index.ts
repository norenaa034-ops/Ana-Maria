export interface BulkTier {
  minQty: number;
  pricePerUnit: number;
  label: string;
  discountPercent: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  comment: string;
  verifiedDeployment: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: 'computo' | 'redes' | 'audiovisual' | 'seguridad' | 'energia' | 'perifericos';
  categoryLabel: string;
  brand: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  idealFor: string;
  dimensions: string;
  powerSpec: string;
  operatingSystemOrFirmware: string;
  originCountry: string;
  mtbfHours: string;
  operatingTemp: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  boxContents: string[];
  basePriceUSD: number;
  bulkTiers: BulkTier[];
  inStock: boolean;
  stockCount: number;
  leadTimeDays: number;
  image: string;
  specs: ProductSpec[];
  certifications: string[];
  warranty: string;
  featured?: boolean;
}

export interface EnterpriseBundle {
  id: string;
  name: string;
  code: string;
  targetSegment: string;
  description: string;
  items: { productId: string; quantity: number }[];
  extraDiscountPercent: number;
  slaHighlight: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type Currency = 'USD' | 'EUR' | 'COP' | 'MXN';

export interface CompanyBillingInfo {
  companyName: string;
  taxId: string; // RUT / CIF / RFC / Tax ID
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  department: string;
  paymentTerms: 'credit_net30' | 'credit_net60' | 'wire_transfer' | 'corporate_card';
  notes?: string;
}

export interface EnterpriseOrder {
  id: string;
  orderNumber: string;
  date: string;
  companyInfo: CompanyBillingInfo;
  items: CartItem[];
  subtotalUSD: number;
  discountUSD?: number;
  taxUSD: number;
  shippingUSD: number;
  totalUSD: number;
  status: 'credit_review' | 'warehouse_preparation' | 'in_transit' | 'delivered';
  trackingNumber: string;
  estimatedDelivery: string;
  carrier: string;
}

export interface QuoteRequestData {
  id: string;
  quoteNumber: string;
  date: string;
  companyInfo: CompanyBillingInfo;
  items: CartItem[];
  subtotalUSD: number;
  estimatedTaxUSD: number;
  totalUSD: number;
  validUntil: string;
}
