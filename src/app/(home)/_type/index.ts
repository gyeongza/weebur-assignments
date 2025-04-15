export interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export type Order = 'asc' | 'desc';

export interface ProductFilterParams {
  q?: string;
  sortBy?: string;
  order?: Order;
  skip?: number;
  limit?: number;
}
