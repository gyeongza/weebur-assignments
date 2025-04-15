'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/app/_components/ui/button';
import { setQueryParams } from '@/app/_utils/setQueryParams';

const sortOptions: Record<string, { sortBy: string; order: 'asc' | 'desc' } | null> = {
  rating_desc: { sortBy: 'rating', order: 'desc' },
  rating_asc: { sortBy: 'rating', order: 'asc' },
  none: null,
};

export default function ProductFilterForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');

  useEffect(() => {
    setKeyword(params.get('q') ?? '');
    setSort(params.get('sortBy') ?? '');
    setOrder(params.get('order') ?? '');
  }, [params]);

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
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
        className="w-40 rounded border px-2 py-1 text-sm"
      />

      <select
        value={currentSortValue}
        onChange={(e) => handleSortChange(e.target.value)}
        className="rounded border px-2 py-1 text-sm"
      >
        <option value="none">기본</option>
        <option value="rating_desc">별점 높은순</option>
        <option value="rating_asc">별점 낮은순</option>
      </select>

      <Button type="submit" size="sm">
        검색
      </Button>
    </form>
  );
}
