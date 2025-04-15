'use client';

import { useState } from 'react';
import { ProductsResponse } from '../_type';
import ProductCard from './product-card';
import ViewButton from './view-button';
import { cn } from '@/app/_lib/utils';

export type ViewMode = 'list' | 'grid';
interface ProductListProps {
  productList: ProductsResponse;
}

export default function ProductList({ productList }: ProductListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleViewModeChange = (viewMode: ViewMode) => {
    setViewMode(viewMode);
  };

  return (
    <div className="flex flex-col gap-4">
      <ViewButton viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      <div
        className={cn(
          'flex flex-col gap-4',
          viewMode === 'grid' ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4' : '',
        )}
      >
        {productList.products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}
