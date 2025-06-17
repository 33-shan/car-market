"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Cactus_Classical_Serif } from 'next/font/google'

const cactus = Cactus_Classical_Serif({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token === "my-secret-token") {
      setIsAdmin(true);
    }

    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    setCars(storedCars);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center mb-6">
      <Image
        className="dark:invert"
        src="/logo.png"
        alt="Next.js logo"
        width={400}
        height={100}
        priority
      />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mt-8 mb-4">🚗 最新車輛</h2>
        {cars.length === 0 ? (
          <p className="text-gray-400">目前尚無上架車輛</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars.map((car, i) => (
              <Link key={i} href={`/car/${car.id}`} className="block bg-white p-6 rounded w-[380px] shadow-md hover:shadow-lg transition">
                <img src={car.imageBase64List?.[0] || "/no-image.png"}
  alt="車輛圖片"
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
            className="text-white border px-4 py-2 mt-6 inline-block"
          >
            管理車輛
          </Link>
        )}
      </main>
    </div>
  );
}