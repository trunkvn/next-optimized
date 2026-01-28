"use client";

import { useState, useEffect } from "react";
import { 
    SwrComparisonGood, SwrComparisonBad, 
    ScrollTrackerGood, ScrollTrackerBad, 
    MemoryLeakDemo 
} from "@/components/client-fetching/fetching-bits";
import { versionedStorage } from "@/lib/storage/versioned-storage";
import Link from "next/link";

export default function ClientFetchingPage() {
  const [pref, setPref] = useState<string | null>(null);

  useEffect(() => {
    const saved = versionedStorage.get<string>("user_preference");
    setPref(saved || "Not set");
  }, []);

  const savePreference = () => {
    const newVal = `Mode-${Math.floor(Math.random() * 100)}`;
    versionedStorage.set("user_preference", newVal);
    setPref(newVal);
  };

  return (
    <main className="min-h-[120vh] bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Client Interaction
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Tối ưu hóa phản hồi của trình duyệt bằng cách quản lý bộ nhớ thông minh và xử lý sự kiện không chặn Main Thread.
          </p>
        </header>

        {/* 1. SWR Dedup Comparison */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Request Deduplication (SWR)</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SwrComparisonBad />
            <SwrComparisonGood />
          </div>
        </section>

        {/* 2 & 3. Event Listeners Comparison */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Performance Event Listeners</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollTrackerBad />
            <ScrollTrackerGood />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MemoryLeakDemo />
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-4 flex flex-col justify-center">
                <p className="text-xs text-white/50 italic leading-relaxed">
                    <strong>Rule:</strong> Luôn sử dụng <code>{"{ passive: true }"}</code> cho các sự kiện cuộn (scroll) hoặc chạm (touch) và KHÔNG bao giờ quên return cleanup function để tránh rò rỉ bộ nhớ.
                </p>
            </div>
          </div>
        </section>

        {/* 4. LocalStorage Schema */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. Versioned LocalStorage</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="p-10 rounded-[40px] bg-orange-500/5 border border-white/5 space-y-6">
            <div className="max-w-md mx-auto space-y-6">
                <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/10">
                   <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Saved Pref (V2.0)</span>
                   <code className="text-orange-400 font-bold">{pref}</code>
                </div>
                <button 
                  onClick={savePreference}
                  className="w-full py-4 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-2xl font-black italic uppercase tracking-widest shadow-lg shadow-orange-900/20 transition-all active:scale-95"
                >
                  Update & Save
                </button>
            </div>
            <div className="p-4 bg-black/40 rounded-xl font-mono text-[10px] text-orange-300/80 max-w-lg mx-auto overflow-x-auto">
                <p className="text-white/20 mb-1">// Prevents storage structure conflicts</p>
                <p>storage.set("key_v2.0", data);</p>
            </div>
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
