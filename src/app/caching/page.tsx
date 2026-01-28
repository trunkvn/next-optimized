import { getProductData } from "@/lib/caching-demo/actions";
import { CacheStrategyCard, RevalidationTrigger, MemoizationVisual } from "@/components/caching/caching-bits";
import Link from "next/link";

export const metadata = {
  title: "Caching & Revalidation | Next.js Best Practices",
  description: "Mastering the Next.js Data Cache, Request Memoization, and Revalidation strategies.",
};

export default async function CachingPage() {
  // Thực hiện song song để tránh waterfall, nhưng với các chiến lược khác nhau
  const [fullCache, revalidateCache, dynamicData] = await Promise.all([
    getProductData('static'),
    getProductData('isr'),
    getProductData('dynamic')
  ]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Caching & Revalidation
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Tối ưu hóa tốc độ tải trang bằng cách tận dụng bộ nhớ đệm thông minh và làm tươi dữ liệu đúng lúc.
          </p>
        </header>

        {/* 1. Comparison of Strategies */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Data Caching Strategies</h2>
                <div className="h-px bg-white/5 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CacheStrategyCard 
                    title="Force Cache"
                    value={fullCache.price}
                    updatedAt={fullCache.updatedAt}
                    strategy="STATIC"
                    code="cache: 'force-cache'"
                    description="Dữ liệu được lưu vĩnh viễn tại build time hoặc request đầu tiên. Cực nhanh nhưng không tự cập nhật."
                    color="blue"
                />
                <CacheStrategyCard 
                    title="Time-based"
                    value={revalidateCache.price}
                    updatedAt={revalidateCache.updatedAt}
                    strategy="ISR"
                    code="revalidate: 30"
                    description="Tự động làm tươi sau một khoảng thời gian nhất định (ví dụ: 30s). Cân bằng giữa tốc độ và độ tươi."
                    color="purple"
                />
                <CacheStrategyCard 
                    title="No Store"
                    value={dynamicData.price}
                    updatedAt={dynamicData.updatedAt}
                    strategy="DYNAMIC"
                    code="cache: 'no-store'"
                    description="Luôn lấy dữ liệu mới nhất từ Server cho mỗi request. Dùng cho dữ liệu nhạy cảm hoặc thay đổi liên tục."
                    color="amber"
                />
            </div>
        </section>

        {/* 2. On-Demand Revalidation */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. On-Demand Control</h2>
                <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <RevalidationTrigger />
        </section>

        {/* 3. Request Memoization */}
        <section className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="h-px bg-white/5 flex-1"></div>
                <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">3. The "Pure" Efficiency</h2>
                <div className="h-px bg-white/5 flex-1"></div>
            </div>
            <MemoizationVisual />
        </section>

        {/* 4. Best Practice Tips */}
        <section className="p-10 rounded-[40px] bg-indigo-500/5 border border-white/5 space-y-10">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-indigo-400 text-center">Caching Pro Tips</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-xs leading-relaxed text-white/50">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">cache-default-behavior:</p>
                    <p>Trong Next.js, <code className="text-indigo-400 font-bold">fetch</code> được cache mặc định. Hãy chủ động sử dụng <code className="text-indigo-400 font-bold">cache: 'no-store'</code> nếu bạn cần lấy dữ liệu thời gian thực.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">cache-tagged-revalidation:</p>
                    <p>Sử dụng <code className="text-indigo-400 font-bold">tags</code> thay vì đường dẫn tuyệt đối giúp bạn invalidate dữ liệu chính xác hơn trên nhiều trang cùng lúc.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">cache-react-memoization:</p>
                    <p>Với các dữ liệu không dùng fetch (DB query), hãy wrap chúng trong <code className="text-indigo-400 font-bold">React.cache()</code> để đạt được hiệu quả memoization tương đương.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-indigo-300">cache-force-dynamic:</p>
                    <p>Nếu một trang sử dụng <code className="text-indigo-400 font-bold">cookies()</code> hoặc <code className="text-indigo-400 font-bold">headers()</code>, toàn bộ Route đó sẽ trở thành Dynamic (không cache) trừ khi được cấu hình khác.</p>
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
