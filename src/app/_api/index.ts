import api from '../_lib/axios';
import { ProductsResponse } from '../_type';

export const HomeApi = {
  getProducts: async () => {
    const response = await api.get<ProductsResponse>('/products');
    return response.data;
  },
};
