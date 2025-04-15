'use client';

import { ViewMode } from './product-list';
import { AspectRatio } from '@/app/_components/ui/aspect-ratio';
import { Skeleton } from '@/app/_components/ui/skeleton';

interface Props {
  viewMode?: ViewMode;
}

export default function ProductListSkeleton({ viewMode = 'grid' }: Props) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} viewMode={viewMode} />
      ))}
    </>
  );
}

export function ProductCardSkeleton({ viewMode = 'grid' }: Props) {
  if (viewMode === 'grid') {
    return (
      <div className="h-full overflow-hidden rounded-lg border">
        <AspectRatio ratio={1 / 1}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
        <div className="flex flex-col gap-2 p-4">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center overflow-hidden rounded-lg border">
      <Skeleton className="h-32 w-32 flex-shrink-0" />
      <div className="flex w-full flex-col justify-between gap-2 p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
