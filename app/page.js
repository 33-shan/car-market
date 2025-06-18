'use client' // 添加這行，因為使用了瀏覽器專用API

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';

function ClientOnlyContent() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 添加加載狀態

  useEffect(() => {
    // 確保在客戶端執行
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("adminToken");
      if (token === "my-secret-token") {
        setIsAdmin(true);
      }

      const search = new URLSearchParams(window.location.search);
      setIsNew(search.get("new") === "1");

      const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
      setCars(storedCars);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p className="text-gray-500 mt-4">載入中...</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mt-8 mb-4">🚗 最新車輛</h2>
      {cars.length === 0 ? (
        <p className="text-gray-400">目前尚無上架車輛</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map((car, i) => (
            <Link key={i} href={`/car/${car.id}`} className="block bg-white p-6 rounded w-[380px] shadow-md hover:shadow-lg transition">
              <Image
                src={car.imageBase64List?.[0] || "/no-image.png"}
                alt="車輛圖片"
                width={380}
                height={256}
                className="w-full h-64 object-cover rounded-md"
              />
              <p className="font-semibold">{car.brand} {car.model}（{car.year} 年）</p>
              <p><span className="font-semibold">價格</span> {car.price} 萬</p>
              <p><span className="font-semibold">顏色</span> {car.color}</p>
              <p><span className="font-semibold">里程</span> {car.mileage} km</p>
            </Link>
          ))}
        </div>
      )}
      {isAdmin && (
        <Link href="/manage-cars" className="text-white border px-4 py-2 mt-6 inline-block">
          管理車輛
        </Link>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <Image
        className="dark:invert"
        src="/logo.png"
        alt="Logo"
        width={400}
        height={100}
        priority
      />
      <ClientOnlyContent />
    </div>
  );
}