export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  reorderThreshold: number;
  createdAt: string;
  updatedAt?: string;
} 