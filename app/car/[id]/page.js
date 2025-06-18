'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import Image from "next/image"; 

export default function CarDetailPage() {
  const { id } = useParams(); // 拿到網址中的 id
  const [car, setCar] = useState(null);

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const selected = cars.find((c, index) => index.toString() === id);
    setCar(selected);
  }, [id]);

  if (!car) return <p className="text-center mt-10">找不到車輛資料...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{car.brand} {car.model}（{car.year} 年）</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {car.imageBase64List?.map((Image, i) => (
          <Image key={i} src={Image} alt={`車圖${i}`} className="w-full h-48 object-cover rounded" />
        ))}
      </div>
      <p><strong>價格：</strong>{car.price} 萬</p>
      <p><strong>顏色：</strong>{car.color}</p>
      <p><strong>里程：</strong>{car.mileage} km</p>
      <p><strong>配備：</strong>{car.features}</p>
    </div>
  );
}