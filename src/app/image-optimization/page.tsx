import { ImageComparison, ImageInteractiveSize, LcpPriorityDemo } from "@/components/images/image-bits";
import Link from "next/link";

export const metadata = {
  title: "Image & Media Mastery | Next.js Best Practices",
  description: "Learn how to optimize weightiest resources with Next.js Image component, priority loading, and modern formats like AVIF.",
};

export default function ImageOptimizationPage() {
  const DEMO_IMAGE = "/demo-landscape.png";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Image & Media Mastery
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Tối ưu hóa tài nguyên nặng nhất trên web để cải thiện Core Web Vitals (LCP) và tiết kiệm băng thông người dùng.
          </p>
        </header>

        {/* 1. Comparison Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Bad vs Good Implementation</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <ImageComparison src={DEMO_IMAGE} />
        </section>

        {/* 2. Interactive Resizing */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Byte-Size Simulation</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <ImageInteractiveSize src={DEMO_IMAGE} />
        </section>

        {/* 3. LCP & Priority */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. LCP Priority Patterns</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <LcpPriorityDemo />
        </section>

        {/* 4. Best Practice Tips */}
        <section className="p-10 rounded-[40px] bg-cyan-500/5 border border-white/5 space-y-10">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-cyan-400 text-center">Media Optimization Rules</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-xs leading-relaxed text-white/50">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-cyan-300">image-lcp-priority:</p>
                    <p>Luôn đặt thuộc tính <code className="text-cyan-400 font-bold">priority</code> cho các ảnh LCP (thường là Hero Image trên cùng) để trình duyệt bắt đầu tải chúng trước cả các tài nguyên JS nặng.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-cyan-300">image-modern-formats:</p>
                    <p>Cấu hình <code className="text-cyan-400 font-bold">formats: ['image/avif', 'image/webp']</code> trong next.config.ts để Next.js ưu tiên AVIF - định dạng nén tốt nhất hiện nay.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-cyan-300">image-placeholder-blur:</p>
                    <p>Sử dụng <code className="text-cyan-400 font-bold">placeholder="blur"</code> cho các ảnh tĩnh (Static Imports) để tạo hiệu ứng chuyển cảnh mượt mà thay vì khoảng trắng vô hồn.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-cyan-300">image-sizes-attribute:</p>
                    <p>Định nghĩa thuộc tính <code className="text-cyan-400 font-bold">sizes</code> chính xác để trình duyệt biết tải đúng kích thước ảnh cho từng breakpoint (mobile vs desktop).</p>
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
