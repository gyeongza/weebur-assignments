import { api } from '@/app/_lib/axios';
import { ProductsResponse } from '../_type';

export const HomeApi = {
  getProducts: async () => {
    const response = await api.get<ProductsResponse>('/product');
    return response.data;
  },
};
