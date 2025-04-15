import { useInfiniteQuery } from '@tanstack/react-query';
import { Order, ProductFilterParams } from '../../_type';
import { PRODUCTS_PER_PAGE } from '../../_constants';
import { HomeApi } from '../../_api';

interface UseInfiniteProductsProps {
  q: string;
  sortBy: string;
  order: string;
}

export const useInfiniteProducts = ({ q, sortBy, order }: UseInfiniteProductsProps) => {
  return useInfiniteQuery({
    queryKey: ['products', q, sortBy, order],
    queryFn: ({ pageParam = 0 }) => {
      const params: ProductFilterParams = {
        skip: pageParam,
        limit: PRODUCTS_PER_PAGE,
      };

      if (q && q.trim()) params.q = q;
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order as Order;

      return HomeApi.getProducts(params);
    },
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip >= lastPage.total ? undefined : nextSkip;
    },
    initialPageParam: 0,
    select: (data) => data.pages.flatMap((page) => page.products),
  });
};
