"use client";

import { 
    LazyInitBad, LazyInitGood, 
    DerivedStateBad, DerivedStateGood,
    CounterBad, CounterGood,
    MouseTrackerBad, MouseTrackerGood
} from "@/components/re-render/render-bits";
import Link from "next/link";

export default function ReRenderPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Re-render Mastery
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Kiểm soát vòng đời Rendering của React để tạo ra những ứng dụng phản hồi tức thì và tiết kiệm tài nguyên.
          </p>
        </header>

        {/* 1. Lazy State Init */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Lazy State Initialization</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LazyInitBad />
            <LazyInitGood />
          </div>
          <p className="text-xs text-white/30 text-center italic">
            Mẹo: Chỉ gọi hàm khởi tạo trực tiếp trong `useState` nếu hàm đó cực nhẹ. Ngược lại, hãy luôn dùng hàm ẩn danh (initializer function).
          </p>
        </section>

        {/* 2. Derived State */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Derived State vs Effect</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DerivedStateBad items={[1, 2, 3, 4, 5]} />
            <DerivedStateGood items={[1, 2, 3, 4, 5]} />
          </div>
        </section>

        {/* 3. Functional SetState */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. Atomic State Updates</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CounterBad />
            <CounterGood />
          </div>
        </section>

        {/* 4. Transient Values with Refs */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">4. High-Frequency Updates (Refs)</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <MouseTrackerBad />
                <p className="text-[10px] text-red-400/60 leading-relaxed italic px-4">
                   Updating state liên tục khi di chuột khiến React phải tính toán lại DOM ảo hàng trăm lần/giây, gây nghẽn UI nếu component lớn.
                </p>
            </div>
            <div className="space-y-4">
                <MouseTrackerGood />
                <p className="text-[10px] text-green-400/60 leading-relaxed italic px-4">
                   Bằng cách dùng Ref và thao tác trực tiếp lên DOM (Transient update), chúng ta hoàn toàn loại bỏ quá trình re-render của React.
                </p>
            </div>
          </div>
        </section>

        <section className="p-10 rounded-[40px] bg-indigo-500/5 border border-white/5 text-center space-y-4">
            <h4 className="text-xl font-bold italic tracking-tight uppercase text-indigo-400">The Power of "Zero Render"</h4>
            <p className="text-sm text-white/40 max-w-2xl mx-auto leading-relaxed">
               "Component tốt nhất là component không re-render khi không cần thiết." Luôn ưu tiên dùng Ref cho các giá trị tạm thời và tính toán trực tiếp thay vì lạm dụng State.
            </p>
        </section>

        <div className="flex justify-center pt-8">
            <Link href="/" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                ← Back to Dashboard
            </Link>
        </div>
      </div>
    </main>
  );
}
