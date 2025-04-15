'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import { setQueryParams } from '@/app/_utils/setQueryParams';
import { Order } from '../_type';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/_components/ui/select';
import { Input } from '@/app/_components/ui/input';

const sortOptions: Record<string, { sortBy: string; order: Order } | null> = {
  rating_desc: { sortBy: 'rating', order: 'desc' },
  rating_asc: { sortBy: 'rating', order: 'asc' },
  none: null,
};

export default function ProductFilterForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState(params.get('q') ?? '');
  const [sort, setSort] = useState(params.get('sortBy') ?? '');
  const [order, setOrder] = useState(params.get('order') ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = setQueryParams({
      q: keyword.trim(),
      sortBy: sort || undefined,
      order: order || undefined,
    });

    router.push(`?${queryParams.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const selected = sortOptions[value];
    if (selected) {
      setSort(selected.sortBy);
      setOrder(selected.order);
    } else {
      setSort('');
      setOrder('');
    }
  };

  const currentSortValue =
    Object.entries(sortOptions).find(([_, val]) => val?.sortBy === sort && val?.order === order)?.[0] || 'none';

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
        className="w-40 rounded border px-2 py-1 text-sm"
      />

      <Select value={currentSortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="정렬 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">기본</SelectItem>
          <SelectItem value="rating_desc">별점 높은순</SelectItem>
          <SelectItem value="rating_asc">별점 낮은순</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size="sm">
        검색
      </Button>
    </form>
  );
}
