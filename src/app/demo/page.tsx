// src/app/demo/page.tsx (Bản cập nhật tối ưu)
import { UserListServer } from "@/components/user-list-server";
import { UserListClient } from "@/components/user-list-client";
import { Suspense } from "react";

// Một Skeleton component đơn giản (Best Practice: rendering-activity)
const Skeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/10" />
    ))}
  </div>
);

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-black to-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            API Flow Boilerplate
          </h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            Áp dụng chuẩn <span className="text-blue-400">Vercel Performance</span>: Streaming, Caching và Type-safe Service Layer.
          </p>
        </header>

        <section className="p-8 rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl space-y-10">
          {/* Quy tắc async-suspense-boundaries: Bao bọc Server Component có await */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Initial Data (Server Streaming)
            </h2>
            <Suspense fallback={<Skeleton />}>
              <UserListServer />
            </Suspense>
          </div>

          <hr className="border-white/5" />

          {/* Client-side part */}
          <div className="space-y-4">
            <UserListClient />
          </div>
        </section>
      </div>
    </main>
  );
}