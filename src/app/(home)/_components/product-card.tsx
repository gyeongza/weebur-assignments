'use client';

import Image from 'next/image';
import { Product } from '../_type';
import { ViewMode } from './product-list';
import { AspectRatio } from '@/app/_components/ui/aspect-ratio';

interface ProductCardProps {
  product: Product;
  viewMode?: ViewMode;
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const renderContent = () => (
    <>
      <h3 className="truncate text-lg font-medium">{product.title}</h3>
      <p className="line-clamp-2 text-sm text-gray-500">{product.description}</p>
      <div className="flex items-center gap-1">
        <span className="text-yellow-500">★</span>
        <span>{product.rating}</span>
        <span className="text-gray-500">({product.reviews})</span>
      </div>
    </>
  );

  if (viewMode === 'grid') {
    return (
      <div className="h-full overflow-hidden rounded-lg border">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </AspectRatio>
        <div className="flex flex-col gap-2 p-4">{renderContent()}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center overflow-hidden rounded-lg border">
      <div className="relative h-32 w-32 flex-shrink-0">
        <Image src={product.thumbnail} alt={product.title} width={128} height={128} className="object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-2 p-4">{renderContent()}</div>
    </div>
  );
}
