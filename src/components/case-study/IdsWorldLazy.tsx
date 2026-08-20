'use client';

import dynamic from 'next/dynamic';

// Loaded only when the IDS page actually renders it — keeps the ~150KB three.js
// bundle out of the shared /projects/[slug] chunk every other project pays for.
export const IdsWorldLazy = dynamic(() => import('./IdsWorld').then((m) => m.IdsWorld), {
    ssr: false,
    loading: () => <div className="h-[60vh] rounded-2xl border border-white/10 bg-white/[0.02] animate-pulse" />,
});
