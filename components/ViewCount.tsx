import React, { useEffect, useState } from 'react';
import { formatCount, recordPostView } from '../viewCounts';

/** "· N views" on a blog post page. Counts each browser once per post. */
export const ViewCount: React.FC<{ slug: string }> = ({ slug }) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    recordPostView(slug).then((n) => {
      if (!cancelled) setViews(n);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views === null) return null;
  return <span className="tabular-nums">· {formatCount(views, 'view', 'views')}</span>;
};
