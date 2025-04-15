'use client';

import { useEffect, useState } from 'react';

export type ViewMode = 'list' | 'grid';

const VIEW_MODE_KEY = 'view_mode';
const VIEW_MODE_TTL = 1000 * 60 * 60 * 24;

interface StoredViewMode {
  value: ViewMode;
  timestamp: number;
}

const useViewMode = () => {
  const [viewMode, setViewMode] = useState<ViewMode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_MODE_KEY);

    if (stored) {
      const parsed: StoredViewMode = JSON.parse(stored);
      const now = Date.now();

      if (now - parsed.timestamp < VIEW_MODE_TTL) {
        setViewMode(parsed.value);
        return;
      }
    }

    const random = Math.random() < 0.5 ? 'grid' : 'list';
    setViewMode(random);

    const newData = {
      value: random,
      timestamp: Date.now(),
    };

    localStorage.setItem(VIEW_MODE_KEY, JSON.stringify(newData));
  }, []);

  return { viewMode, setViewMode };
};

export default useViewMode;
