import { getProjectDetails, getGlobalConfig } from "@/lib/server-demo/data";
import { ServerActionDemo, DataMinimalist, DataBloated } from "@/components/server-performance/client-bits";
import { Suspense } from "react";
import Link from "next/link";

const ProjectInfo = async ({ id }: { id: string }) => {
  const [details, config] = await Promise.all([
    getProjectDetails(id),
    getGlobalConfig()
  ]);

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
        <p className="text-[10px] text-indigo-400 font-black uppercase mb-3">Server Data Fetched</p>
        <p className="text-xl font-bold">{details.name}</p>
        <p className="text-xs text-white/40 mt-1 italic">Dữ liệu này được lấy song song và có cache tại Request-level.</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <DataBloated project={details} />
        <DataMinimalist projectName={details.name} id={details.id} />
      </div>
    </div>
  );
};

export default function ServerPerformancePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Server Performance
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Hợp lý hóa cách Server xử lý dữ liệu và giao tiếp với Client để đạt tốc độ phản hồi tối ưu.
          </p>
        </header>

        {/* 1. Request Caching & Parallel Fetching */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Parallel & React.cache</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
               <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-[11px] text-emerald-300/80">
                  <p className="text-white/20 mb-2">// use React.cache in your data layer</p>
                  <p className="text-emerald-400">export const getData = cache(async () ={">"} {"{"}</p>
                  <p className="pl-4">return db.query(...);</p>
                  <p className="text-emerald-400">{"}"});</p>
                  <p className="text-white/20 mt-4">// fire them in parallel</p>
                  <p>const [a, b] = await Promise.all([</p>
                  <p className="pl-4">getData(), getOther()</p>
                  <p>]);</p>
               </div>
               <p className="text-xs text-white/40 leading-relaxed italic border-l-2 border-emerald-500/50 pl-4">
                  Việc sử dụng <code>cache()</code> giúp "khử trùng" request trong cùng một lần render, tránh việc query database lặp lại vô ích.
               </p>
            </div>

            <Suspense fallback={<div className="h-64 bg-white/5 animate-pulse rounded-3xl" />}>
              <ProjectInfo id="1" />
            </Suspense>
          </div>
        </section>

        {/* 2. Server Actions & After */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Actions & Non-blocking</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="space-y-6">
                <ServerActionDemo />
                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
                   <h3 className="text-blue-400 font-bold text-sm uppercase">server-after() Strategy</h3>
                   <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-blue-300/70">
                      <p>return {"{"} success: true {"}"};</p>
                      <p className="text-blue-400 font-bold mt-2">// Runs AFTER response is sent</p>
                      <p>after(() ={">"} {"{"}</p>
                      <p className="pl-4">trackAnalytics();</p>
                      <p className="pl-4">sendEmail();</p>
                      <p>{"}"});</p>
                   </div>
                </div>
             </div>
             
             <div className="p-8 rounded-[40px] bg-white/2 border border-white/10 space-y-6">
                <h4 className="text-xl font-bold italic tracking-tight">Quy tắc Serialization:</h4>
                <div className="space-y-4 text-sm text-white/60">
                   <div className="space-y-2">
                      <p className="text-red-400 font-black text-[10px] uppercase tracking-widest">Không nên:</p>
                      <p className="p-3 bg-red-400/5 border border-red-400/10 rounded-xl">Truyền toàn bộ Object Database xuống Client Component.</p>
                   </div>
                   <div className="space-y-2">
                      <p className="text-green-400 font-black text-[10px] uppercase tracking-widest">Nên làm:</p>
                      <p className="p-3 bg-green-400/5 border border-green-400/10 rounded-xl italic">Chỉ truyền các primitive (string, number, boolean) hoặc object đã được tinh lọc.</p>
                   </div>
                   <p className="text-[10px] text-white/30 pt-4 leading-relaxed italic">
                      Lý do: Next.js phải biến toàn bộ payload thành chuỗi JSON. Càng nhiều dữ liệu thừa, người dùng càng mất nhiều thời gian tải trang ban đầu.
                   </p>
                </div>
             </div>
          </div>
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
