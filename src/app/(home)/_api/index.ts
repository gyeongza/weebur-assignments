import { api } from '@/app/_lib/axios';
import { ProductsResponse } from '../_type';
import { PRODUCTS_PER_PAGE } from '../_constants';

export const HomeApi = {
  getProducts: async (skip = 0, limit = PRODUCTS_PER_PAGE) => {
    const response = await api.get<ProductsResponse>('/product', {
      params: { skip, limit },
    });
    return response.data;
  },
};
