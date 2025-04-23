export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: ProductSize[];
}

export interface ProductSize {
  size: string;
  price: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  size: string;
}

export interface DeliveryInfo {
  address: string;
  contactNumber: string;
  deliveryTime: string;
  notes: string;
}