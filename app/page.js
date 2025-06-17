'use client';
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';

const HomeContent = dynamic(() => import('./components/HomeContent'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <Image
        src="/logo.png"
        alt="Logo"
        width={400}
        height={100}
        priority
      />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mt-8 mb-4">🚗 最新車輛</h2>
        <HomeContent />
        <Link
          href="/manage-cars"
          className="text-white border px-4 py-2 mt-6 inline-block"
        >
          管理車輛
        </Link>
      </main>
    </div>
  );
}