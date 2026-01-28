"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { BarrelComparison, AnalyticsVisual, UiKitShowcase } from "@/components/bundle/bundle-bits";

// --- DYNAMIC IMPORTS ---
const DynamicHeavyChart = dynamic(() => import("@/components/heavy-charts/heavy-chart"), {
  loading: () => <div className="h-48 bg-white/5 animate-pulse rounded-4xl flex items-center justify-center text-[10px] font-black uppercase text-white/20 tracking-widest italic border border-white/5">Loading heavy module...</div>,
  ssr: false,
});

const ExpensiveFeature = dynamic(() => import("@/components/heavy-charts/heavy-chart"), {
  loading: () => <div className="h-48 bg-white/5 animate-pulse rounded-4xl flex items-center justify-center text-[10px] font-black uppercase text-white/20 tracking-widest italic border border-white/5">Initializing expensive feature...</div>,
  ssr: false,
});

export default function BundlePage() {
  const [showFeature, setShowFeature] = useState(false);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      {/* Analytics Simulation */}
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=DEMO" 
        strategy="afterInteractive" 
      />

      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Bundle Optimization
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Làm cho trang web tải nhanh như chớp bằng cách chia nhỏ JavaScript và gỡ bỏ mã nguồn dư thừa.
          </p>
        </header>

        {/* 1. Barrel Imports */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Tree-Shaking & Barrel Imports</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <BarrelComparison />
          <UiKitShowcase />
        </section>

        {/* 2. Dynamic Loading */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Incremental Loading</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="p-8 rounded-[40px] bg-white/2 border border-white/10 space-y-6">
                    <h3 className="text-xl font-bold italic tracking-tight uppercase text-blue-400">Dynamic Imports</h3>
                    <p className="text-sm text-white/50 leading-relaxed italic">
                        "Đừng nạp chiếc ghế khi người dùng đang ở trong bếp." Hãy chỉ tải các component nặng khi trình duyệt đã hydration xong hoặc khi thực sự cần thiết.
                    </p>
                    <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-blue-300/80">
                        <p className="text-white/20 mb-1">// Code-splits this component</p>
                        <p>const Chart = dynamic(() ={">"} import("./Chart"));</p>
                    </div>
                </div>
                <AnalyticsVisual />
            </div>
            <div className="space-y-4">
                 <p className="text-[10px] font-black uppercase text-white/20 tracking-widest text-center">Live Preview: Heavy Chart</p>
                 <DynamicHeavyChart />
            </div>
          </div>
        </section>

        {/* 3. Conditional Feature */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. Conditional Feature Loading</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          
          <div className="p-10 rounded-[40px] bg-purple-500/5 border border-white/5 space-y-8 text-center">
            <div className="max-w-xl mx-auto space-y-4">
                <h4 className="text-2xl font-black italic tracking-tighter uppercase text-purple-400">On-Demand Modules</h4>
                <p className="text-sm text-white/40 leading-relaxed">
                   Nếu 90% người dùng không bao giờ mở tab "Advanced Settings", tại sao chúng ta lại bắt 100% người dùng phải tải mã nguồn cho tab đó ngay từ đầu?
                </p>
            </div>
            
            <button 
              onClick={() => setShowFeature(true)}
              disabled={showFeature}
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-black italic uppercase tracking-widest shadow-lg shadow-purple-900/20 transition-all active:scale-95 disabled:opacity-50"
            >
              {showFeature ? "Module Initialized" : "Activate Expensive Module"}
            </button>

            {showFeature && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <ExpensiveFeature />
              </div>
            )}
          </div>
        </section>

        <div className="flex justify-center pt-8 pb-20">
            <Link href="/" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                ← Back to Dashboard
            </Link>
        </div>
      </div>
    </main>
  );
}
