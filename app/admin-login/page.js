'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "123456") {
      localStorage.setItem("adminToken", "my-secret-token");

      // ✅ 重新導向首頁並刷新頁面，確保 isAdmin 被觸發
      window.location.href = "/";
    } else {
      setError("密碼錯誤，請再試一次");
    }
  };

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">🔐 管理員登入</h1>
      <form onSubmit={handleLogin} className="max-w-xs w-full space-y-4">
        <input
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 text-black rounded"
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded"
        >
          登入
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
