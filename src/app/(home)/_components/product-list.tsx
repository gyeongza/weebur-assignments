'use client';

import { ProductsResponse } from '../_type';
import ProductCard from './product-card';
import ViewButton from './view-button';
import useViewMode from '../_hooks/useViewMode';
import ProductListSkeleton from './product-list-skeleton';

export type ViewMode = 'list' | 'grid';
interface ProductListProps {
  productList: ProductsResponse;
}

export default function ProductList({ productList }: ProductListProps) {
  const { viewMode, setViewMode } = useViewMode();

  if (!viewMode) return null;

  const handleViewModeChange = (viewMode: ViewMode) => {
    setViewMode(viewMode);
  };

  return (
    <div className="flex flex-col gap-4">
      <ViewButton viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      <div
        className={viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4' : 'flex flex-col gap-4'}
      >
        {!productList ? (
          <ProductListSkeleton viewMode={viewMode} />
        ) : (
          productList.products.map((product) => <ProductCard key={product.id} product={product} viewMode={viewMode} />)
        )}
      </div>
    </div>
  );
}
