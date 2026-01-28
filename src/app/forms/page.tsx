import { getMessages } from "@/lib/forms-demo/actions";
import { OptimisticDemo, ValidationDemo } from "@/components/forms/forms-bits";
import Link from "next/link";

export const metadata = {
  title: "Forms & Optimistic UI | Next.js Best Practices",
  description: "Mastering form handling and instant UI updates with useOptimistic and Server Actions.",
};

export default async function FormsPage() {
  const initialMessages = await getMessages();
  console.log(initialMessages)

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Forms & Optimistic UI
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
             Xây dựng trải nghiệm người dùng không độ trễ bằng cách dự đoán kết quả thành công và xử lý Form chuyên nghiệp.
          </p>
        </header>

        {/* 1. useOptimistic Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Instant Updates (useOptimistic)</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <OptimisticDemo initialMessages={initialMessages} />
        </section>

        {/* 2. Validation & useTransition */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Resilient Forms</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <ValidationDemo />
        </section>

        {/* 3. Deep Dive Tips */}
        <section className="p-10 rounded-[40px] bg-emerald-500/5 border border-white/5 space-y-10">
           <h4 className="text-xl font-bold italic tracking-tight uppercase text-emerald-500 text-center">Pro Form Handling Rules</h4>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-xs leading-relaxed text-white/50">
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-emerald-300">forms-use-status:</p>
                    <p>Luôn sử dụng <code className="text-emerald-400 font-bold">useFormStatus</code> để cung cấp feedback trực quan (loading spinner, disabled button) khi action đang xử lý.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-emerald-300">forms-progressive-enhancement:</p>
                    <p>Sử dụng thuộc tính <code className="text-emerald-400 font-bold">action</code> của thẻ form thay vì <code className="text-emerald-400 font-bold">onClick</code> để đảm bảo form hoạt động cả khi JavaScript chưa tải xong hoặc bị tắt.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-emerald-300">forms-server-validation:</p>
                    <p>Đừng bao giờ tin tưởng client. Luôn validate dữ liệu ở server dùng các thư viện như <code className="text-emerald-400 font-bold">Zod</code> trước khi thực hiện mutation.</p>
                </div>
                <div className="space-y-3">
                    <p className="font-black uppercase text-[10px] tracking-widest text-emerald-300">forms-reset-after-action:</p>
                    <p>Sử dụng <code className="text-emerald-400 font-bold">useRef</code> để reset form ngay lập tức khi thực hiện client-side action, giúp UI cảm giác phản hồi nhanh hơn.</p>
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
