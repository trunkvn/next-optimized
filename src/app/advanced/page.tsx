"use client";

import { StableCallbackBad, StableCallbackGood, InitOnceDemo } from "@/components/advanced/advanced-bits";
import Link from "next/link";

export default function AdvancedPatternsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-violet-600 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Advanced Patterns
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Những kỹ thuật chuyên sâu dành cho các ứng dụng quy mô lớn, đảm bảo tính ổn định tối đa cho callback và khởi tạo hệ thống.
          </p>
        </header>

        {/* 1. useLatest / Stable Callbacks */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Reference Stability (useLatest)</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StableCallbackBad />
            <StableCallbackGood />
          </div>
          <div className="max-w-3xl mx-auto p-10 rounded-[40px] bg-indigo-500/5 border border-white/5 space-y-4">
            <h4 className="text-xl font-bold italic tracking-tight uppercase text-indigo-400 text-center">The Callback Identity Problem</h4>
            <div className="text-sm text-white/60 leading-relaxed space-y-4">
              <p>
                <strong>Vấn đề:</strong> Khi bạn sử dụng `useCallback` với các dependency (như state hoặc props), hàm sẽ bị khởi tạo lại (changed identity) mỗi khi dependency thay đổi. Điều này khiến các `useEffect` chứa listener, timer hoặc socket bị destroy và recreate liên tục.
              </p>
              <p>
                <strong>Giải pháp:</strong> Hook <code className="text-indigo-400 font-bold italic">useLatest</code> sử dụng `useRef` để luôn giữ tham chiếu tới giá trị/hàm mới nhất mà không làm thay đổi chính định danh của nó. Điều này giúp các Side-Effect của bạn cực kỳ ổn định.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Init Once */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Infrastructure Initialization</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <InitOnceDemo />
          <p className="text-xs text-white/30 text-center italic max-w-2xl mx-auto">
            Mẹo: Trong React Strict Mode, các component có thể bị mount/unmount 2 lần. Sử dụng biến cờ (flag) toàn cục giúp đảm bảo các logic "đắt đỏ" như Analytics, WebSockets chỉ khởi tạo đúng 1 lần.
          </p>
        </section>

        <section className="p-10 rounded-[40px] bg-white/2 border border-white/5 space-y-8">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-white/80 text-center">Architecture Notes</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-white/60">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">Design Systems:</p>
                    <p className="leading-relaxed">Các pattern này cực kỳ quan trọng khi xây dựng UI Library, nơi bạn cần xử lý các sự kiện Window/Document mà vẫn phải đảm bảo không làm gián đoạn React Lifecycle.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">Concurrent Safety:</p>
                    <p className="leading-relaxed">Việc sử dụng đúng Ref patterns giúp ứng dụng của bạn an toàn hơn trong môi trường Concurrent Rendering của React 18+, tránh các lỗi về rò rỉ bộ nhớ hoặc stale closures.</p>
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
