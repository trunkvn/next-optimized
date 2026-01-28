"use client";

import { LookupDemo, IterationDemo, MinMaxDemo, CssBatchingDemo } from "@/components/java-script/js-bits";
import Link from "next/link";

export default function JavaScriptPerformancePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            JavaScript Mastery
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Tối ưu hóa các thuật toán xử lý dữ liệu để giảm tải cho CPU và làm cho ứng dụng phản hồi nhanh hơn.
          </p>
        </header>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">Micro-Benchmarks</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <LookupDemo />
            <IterationDemo />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <MinMaxDemo />
            <CssBatchingDemo />
          </div>
        </section>

        <section className="p-10 rounded-[40px] bg-amber-500/5 border border-white/5 space-y-10">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-amber-500 text-center">Runtime Optimization Rules</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-xs leading-relaxed text-white/50">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-amber-300">js-early-exit:</p>
                    <p>Luôn thoát khỏi hàm sớm nhất có thể. Điều này giúp code phẳng hơn và tránh lãng phí CPU cho các logic không cần thiết.</p>
                    <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] text-amber-200/60">
                        <p>if (!user) return;</p>
                        <p>// logic for valid user...</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-amber-300">js-cache-property-access:</p>
                    <p>Lưu thuộc tính (như `length`) vào biến cục bộ trong vòng lặp lớn để tránh việc tra cứu thuộc tính lặp đi lặp lại.</p>
                    <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] text-amber-200/60">
                        <p>const len = items.length;</p>
                        <p>for(let i=0; i{"<"}len; i++) ...</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-amber-300">js-hoist-regexp:</p>
                    <p>Khai báo Regular Expressions bên ngoài vòng lặp để tránh việc biên dịch lại (re-compilation) liên tục.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-amber-300">js-tosorted-immutable:</p>
                    <p>Sử dụng <code className="text-amber-400 font-bold">toSorted()</code> để giữ cho mảng bất biến, giúp React dễ dàng kiểm tra sự thay đổi dữ liệu.</p>
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
