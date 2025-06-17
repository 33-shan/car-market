'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PostCarPage() {
  const router = useRouter();

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    mileage: '',
    features: '',
    imageBase64List: [],
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64List = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );
    console.log("圖片 base64", base64List);
    setCar((prev) => ({ ...prev, imageBase64List: base64List }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 假設儲存在 localStorage（你可以改成 fetch 傳給 API）
    const existingCars = JSON.parse(localStorage.getItem('cars') || '[]');
    localStorage.setItem('cars', JSON.stringify([...existingCars, car]));

    router.push('/?new=1');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">上架車輛</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="品牌"
          value={car.brand}
          onChange={(e) => setCar({ ...car, brand: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="型號"
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="年份"
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="價格（萬元）"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          required
        />
         <input
          className="border p-2 w-full"
          type="text"
          placeholder="顏色"
          value={car.color}
          onChange={(e) => setCar({ ...car, color: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="number"
          placeholder="里程（km）"
          value={car.mileage}
          onChange={(e) => setCar({ ...car, mileage: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="配備（如：天窗、導航、皮椅）"
          value={car.features}
          onChange={(e) => setCar({ ...car, features: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* 預覽圖片 */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {car.imageBase64List.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`預覽圖${i}`}
              className="h-32 object-cover rounded"
            />
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          送出上架
        </button>
      </form>
    </div>
  );
}
