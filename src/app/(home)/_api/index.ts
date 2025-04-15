import { api } from '@/app/_lib/axios';
import { Order, ProductFilterParams, ProductsResponse } from '../_type';
import { PRODUCTS_PER_PAGE } from '../_constants';
import { setQueryParams } from '@/app/_utils/setQueryParams';

export const productKeys = {
  all: ['products'] as const,
  list: () => [...productKeys.all, 'list'] as const,
  listFiltered: (filters: { q?: string; sortBy?: string; order?: Order }) => [...productKeys.list(), filters] as const,
};

const HomeApi = {
  getProducts: async (params: ProductFilterParams = {}) => {
    const queryParams = setQueryParams({
      skip: (params.skip ?? 0).toString(),
      limit: (params.limit ?? PRODUCTS_PER_PAGE).toString(),
      q: params.q,
      sortBy: params.sortBy,
      order: params.order,
    });

    const response = await api.get<ProductsResponse>(`/product?${queryParams.toString()}`);
    return response.data;
  },
};

export default HomeApi;
