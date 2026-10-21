import React from 'react';

export const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-5 border border-white/10 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden"
          >
            <div className="w-full sm:w-32 h-32 rounded-2xl skeleton-neon flex-shrink-0" />
            <div className="flex-1 space-y-3 w-full">
              <div className="h-4 w-1/3 rounded-lg skeleton-neon" />
              <div className="h-6 w-2/3 rounded-xl skeleton-neon" />
              <div className="h-4 w-full rounded-lg skeleton-neon" />
              <div className="h-4 w-1/2 rounded-lg skeleton-neon" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-24 rounded-2xl skeleton-neon border border-white/10 w-full" />
  );
};
