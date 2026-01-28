import { SemanticComparison, FocusManagementDemo, JsonLdPreview } from "@/components/seo-a11y/seo-bits";
import Link from "next/link";

export const metadata = {
  title: "Accessibility & SEO | Next.js Best Practices",
  description: "Building premium UX with semantic HTML, focus management, and structured data for maximum reach.",
  openGraph: {
    title: "A11y & SEO Masterclass",
    description: "Learn how to build inclusive and discoverable web apps.",
    images: ["/demo-landscape.png"],
  },
};

export default function SeoA11yPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-blue-400 to-emerald-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Accessibility & SEO
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Hiệu năng thực thụ là khi mọi người dùng và mọi công cụ tìm kiếm đều có thể tiếp cận được nội dung của bạn một cách dễ dàng.
          </p>
        </header>

        {/* 1. Semantic Check */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Meaningful Structure</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <SemanticComparison />
        </section>

        {/* 2. A11y Interactive */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Inclusive Interactions</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <FocusManagementDemo />
        </section>

        {/* 3. SEO Rich Results */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. Search Engine Optimization</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <JsonLdPreview />
        </section>

        {/* 4. Best Practice Tips */}
        <section className="p-10 rounded-[40px] bg-blue-500/5 border border-white/5 space-y-10">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-blue-400 text-center">Accessibility & SEO Rules</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-xs leading-relaxed text-white/50">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-blue-300">seo-semantic-tags:</p>
                    <p>Sử dụng đúng các thẻ <code className="text-blue-400 font-bold">nav, header, footer, article</code> thay vì lạm dụng <code className="text-blue-400 font-bold">div</code> để tăng khả năng đọc hiểu của crawler.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-blue-300">a11y-keyboard-nav:</p>
                    <p>Luôn đảm bảo mọi thành phần tương tác đều có thể truy cập bằng phím Tab và có trạng thái <code className="text-blue-400 font-bold">:focus</code> rõ ràng.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-blue-300">seo-metadata-api:</p>
                    <p>Tận dụng <code className="text-blue-400 font-bold">Metadata API</code> của Next.js để định nghĩa Title, Description và OpenGraph cho từng trang một cách linh hoạt.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-blue-300">a11y-alt-text:</p>
                    <p>Mỗi tấm ảnh (trừ ảnh trang trí) đều phải có thuộc tính <code className="text-blue-400 font-bold">alt</code> mô tả nội dung một cách súc tích cho người dùng dùng Screen Reader.</p>
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
