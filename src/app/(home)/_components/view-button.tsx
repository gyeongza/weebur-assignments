'use client';

import { List, Grid } from 'lucide-react';

import { Button } from '@/app/_components/ui/button';
import { ViewMode } from './product-list';

export default function ViewButton({
  viewMode,
  onViewModeChange,
}: {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('list')}
        aria-label="리스트 보기"
      >
        <List className="size-4" />
      </Button>
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('grid')}
        aria-label="그리드 보기"
      >
        <Grid className="size-4" />
      </Button>
    </div>
  );
}
