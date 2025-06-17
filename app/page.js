'use client';
import Image from "next/image";
import Link from "next/link";
import { Cactus_Classical_Serif } from "next/font/google";
import dynamic from "next/dynamic";

// ❗用 dynamic import 並設定 ssr: false 才不會觸發 server 錯誤
const HomeContent = dynamic(() => import('./components/HomeContent'), { ssr: false });

const cactus = Cactus_Classical_Serif({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <Image
        src="/logo.png"
        alt="Next.js logo"
        width={400}
        height={100}
        priority
      />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mt-8 mb-4">🚗 最新車輛</h2>
        <HomeContent />
      </main>
    </div>
  );
}