"use client";

import { 
    ConditionalBad, ConditionalGood,
    HoistDemo,
    SvgAnimationBad, SvgAnimationGood,
    LongListGood,
    TransitionLoadingDemo
} from "@/components/rendering/rendering-bits";
import Link from "next/link";

export default function RenderingPerformancePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Rendering Mastery
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Kiểm soát cách trình duyệt vẽ (paint) ứng dụng để đạt tốc độ phản hồi 60 FPS mượt mà tuyệt đối.
          </p>
        </header>

        {/* 1. Conditional Render */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Safe Conditional Rendering</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ConditionalBad count={0} />
            <ConditionalGood count={0} />
          </div>
        </section>

        {/* 2. SVG Animation */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Composite Layer Animations</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <SvgAnimationBad />
            <SvgAnimationGood />
          </div>
          <p className="text-xs text-white/30 text-center italic max-w-2xl mx-auto">
            Mẹo: Luôn ưu tiên xoay (transform) thẻ bọc ngoài Thay vì thay đổi thuộc tính đồ họa bên trong SVG để tận dụng tối đa GPU.
          </p>
        </section>

        {/* 3. Content Visibility */}
        <section className="space-y-8">
           <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. Off-screen Content Skip</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <LongListGood />
          <div className="p-6 rounded-2xl bg-pink-500/5 border border-pink-500/10">
             <p className="text-xs text-white/50 leading-relaxed italic">
                Thuộc tính <code className="text-pink-400 font-bold">content-visibility: auto</code> cho phép trình duyệt bỏ qua mọi công việc liên quan đến layout và paint cho một phần tử cho tới khi nó sắp xuất hiện trên màn hình.
             </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <HoistDemo />
            <TransitionLoadingDemo />
        </div>

        <section className="p-10 rounded-[40px] bg-purple-500/5 border border-white/5 space-y-8">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-purple-400 text-center">Rendering Architecture</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-white/60">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-purple-300">Hoisting JSX:</p>
                    <p className="leading-relaxed">Bằng cách nhấc các phần giao diện tĩnh ra khỏi hàm chính của Component, chúng ta đảm bảo React không lãng phí tài nguyên để khởi tạo lại chúng ở mỗi lượt render.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-purple-300">useTransition:</p>
                    <p className="leading-relaxed">Giúp phân loại các cập nhật trạng thái "không khẩn cấp". Trình duyệt sẽ luôn ưu tiên đảm bảo các thao tác gõ phím hoặc click của người dùng mượt mà trước khi xử lý logic nặng.</p>
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
