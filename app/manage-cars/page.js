'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function ManageCarsPage() {
    const [cars, setCars] = useState([]);
    const router = useRouter();

    // Load cars from localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cars") || "[]");
        setCars(stored);
    }, []);

    // Update localStorage
    const updateStorage = (updatedCars) => {
        setCars(updatedCars);
        localStorage.setItem("cars", JSON.stringify(updatedCars));
    };

    // Delete car
    const handleDelete = (index) => {
        const updated = [...cars];
        updated.splice(index, 1);
        updateStorage(updated);
    };

    // Toggle visibility
    const toggleVisibility = (index) => {
        const updated = [...cars];
        updated[index].visible = !updated[index].visible;
        updateStorage(updated);
    };

    // Edit car
    const handleEdit = (car, index) => {
        localStorage.setItem("editingCar", JSON.stringify({ ...car, index }));
        router.push("/post-car?edit=1");
    };

    return (
        <main className="min-h-screen bg-[#1f1f1f] text-white p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-center">🛠 車輛管理</h1>
                {cars.length === 0 ? (
                    <p className="text-center">尚未有上架車輛。</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {cars.map((car, index) => (
                            <div key={index} className="bg-white text-black rounded-lg p-4 shadow">
                                {car.imageBase64List?.[0] && (
                                    <Image
                                        src={car.imageBase64List[0]}
                                        alt="車輛圖片"
                                        className="w-full h-48 object-contain mb-2 border"
                                    />
                                )}
                                <h2 className="text-xl font-bold mb-1">{car.brand} {car.model}</h2>
                                <p>年份：{car.year}</p>
                                <p>里程：{car.mileage} km</p>
                                <p>顏色：{car.color}</p>
                                <p>價格：{car.price} 萬元</p>
                                <p>配備：{car.features}</p>
                                <label className="flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={car.visible ?? true}
                                        onChange={() => toggleVisibility(index)}
                                    />
                                    公開顯示
                                </label>
                                <div className="mt-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(car, index)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                    >
                                        編輯
                                    </button>
                                    <button
                                        onClick={() => handleDelete(index)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        刪除
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}