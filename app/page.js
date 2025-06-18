'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';

// 定义车辆数据类型
interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  imageBase64List?: string[];
}

function ClientOnlyContent() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 确保在客户端执行
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem("adminToken");
        setIsAdmin(token === "my-secret-token");

        const searchParams = new URLSearchParams(window.location.search);
        setIsNew(searchParams.get("new") === "1");

        const carsData = localStorage.getItem("cars");
        setCars(carsData ? JSON.parse(carsData) : []);
      } catch (error) {
        console.error("初始化错误:", error);
        setCars([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return <p className="text-gray-500 mt-4">載入中...</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      {isNew && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
          新車輛已添加!
        </div>
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">🚗 最新車輛</h2>
      {cars.length === 0 ? (
        <p className="text-gray-400">目前尚無上架車輛</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map((car) => (
            <Link 
              key={car.id} 
              href={`/car/${car.id}`} 
              className="block bg-white p-6 rounded w-[380px] shadow-md hover:shadow-lg transition"
            >
              <Image
                src={car.imageBase64List?.[0] || "/no-image.png"}
                alt={`${car.brand} ${car.model}`}
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
        <Link 
          href="/manage-cars" 
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
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