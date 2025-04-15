'use client';

import { useEffect } from 'react';
import ProductCard from './product-card';
import ViewButton from './view-button';
import useViewMode from '../_hooks/useViewMode';
import ProductListSkeleton from './product-list-skeleton';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import ProductFilterForm from './filter-form';
import { useInfiniteProducts } from '../_hooks/query/useInfiniteProducts';

export type ViewMode = 'list' | 'grid';

export default function ProductList() {
  const { viewMode, setViewMode } = useViewMode();
  const { ref, inView } = useInView();

  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const sortBy = searchParams.get('sortBy') ?? '';
  const order = searchParams.get('order') ?? '';

  const {
    data: productList,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts({ q, sortBy, order });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleViewModeChange = (viewMode: ViewMode) => {
    setViewMode(viewMode);
  };

  if (!viewMode) return null;

  return (
    <div className="flex flex-col gap-4">
      <ProductFilterForm />
      <ViewButton viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      <div
        className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4' : 'flex flex-col gap-4'}
      >
        {isLoading ? (
          <ProductListSkeleton viewMode={viewMode} />
        ) : (
          productList?.map((product) => <ProductCard key={product.id} product={product} viewMode={viewMode} />)
        )}
      </div>
      <div ref={ref} className="my-4 flex h-10 w-full items-center justify-center">
        {!isLoading && productList?.length === 0 && (
          <div className="text-sm text-gray-500">일치하는 결과가 없습니다.</div>
        )}

        {isFetchingNextPage && <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-blue-500" />}

        {!isFetchingNextPage && hasNextPage === false && (productList?.length ?? 0) > 0 && (
          <div className="text-sm text-gray-500">더 이상 불러올 수 없습니다.</div>
        )}
      </div>
    </div>
  );
}
