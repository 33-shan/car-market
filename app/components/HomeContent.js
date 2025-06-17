import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomeContent() {
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem("cars") || "[]");
    setCars(storedCars);
  }, [isNew]);

  return (
    <>
      {cars.length === 0 ? (
        <p className="text-gray-400">目前尚無上架車輛</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cars.map((car, i) => (
            <Link key={i} href={`/car/${car.id}`} className="block bg-white p-6 rounded shadow-md">
              <img
                src={car.imageBase64List?.[0] || "/no-image.png"}
                alt="車輛圖片"
                className="w-full h-64 object-cover rounded-md"
              />
              <p className="font-semibold">{car.brand} {car.model}（{car.year} 年）</p>
              <p>價格：{car.price} 萬</p>
              <p>顏色：{car.color}</p>
              <p>里程：{car.mileage} km</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}