"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CarDetailPage() {
    const router = useRouter();
    const rawParams = useParams(); 
    const [id, setId] = useState(null);
    const [car, setCar] = useState(null);

    useEffect(() => {
        console.log("rawParams:", rawParams);
        if (!rawParams?.id) return;

        const currentId = String(rawParams.id); // 
        console.log("currentId:", currentId);

        const cars = JSON.parse(localStorage.getItem("cars") || "[]");
        const foundCar = cars.find((c) => c.id === currentId); 
        setCar(foundCar);
        console.log("rawParams:", rawParams);
        console.log("currentId:", currentId);
        console.log("car:", foundCar);
    }, [rawParams]);
    if (!car) return <p className="text-center mt-10">載入中...</p>;

    return (
        <main className="max-w-xl mx-auto p-6 space-y-4">
            <img
                src={car.imageBase64}
                alt="車輛圖片"
                className="w-full rounded object-contain shadow"
            />
            <h1 className="text-2xl font-bold">
                {car.brand} {car.model}（{car.year} 年）
            </h1>
            <p>價格：{car.price} 萬</p>
            <p>顏色：{car.color}</p>
            <p>里程：{car.mileage} km</p>
            <p className="whitespace-pre-line">配備：{car.notes}</p>
            <button
                onClick={() => router.push("/")}
                className="mt-6 px-4 py-2 bg-black text-white rounded"
            >
                返回首頁
            </button>
        </main>
    );
}