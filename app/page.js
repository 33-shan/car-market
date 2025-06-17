'use client';
import { Suspense } from 'react';
import HomeContent from './HomeContent';

export default function Home() {
  return (
    <Suspense fallback={<div>載入中...</div>}>
      <HomeContent />
    </Suspense>
  );
}