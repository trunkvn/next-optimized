"use client";

import React, { useState, useTransition } from "react";
import { updatePrice, forceRevalidate } from "@/lib/caching-demo/actions";

// --- 1. Cache strategy Card ---
export const CacheStrategyCard = ({ 
    title, 
    value, 
    updatedAt, 
    strategy, 
    code,
    description,
    color = "blue"
}: { 
    title: string; 
    value: string | number; 
    updatedAt: string; 
    strategy: string; 
    code: string;
    description: string;
    color?: "blue" | "purple" | "amber" | "emerald"
}) => {
    const colorMap = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    };

    return (
        <div className={`p-6 rounded-3xl border ${colorMap[color]} space-y-4`}>
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
                <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 opacity-60">
                    {strategy}
                </span>
            </div>
            
            <div className="space-y-1">
                <p className="text-3xl font-black italic">${value}</p>
                <p className="text-[10px] text-white/30 font-mono">Last fetch: {new Date(updatedAt).toLocaleTimeString()}</p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] text-white/60">
                <p>{code}</p>
            </div>

            <p className="text-[10px] italic leading-relaxed text-white/40">
                {description}
            </p>
        </div>
    );
};

// --- 2. Interactive Revalidation Trigger ---
export const RevalidationTrigger = () => {
    const [isPending, startTransition] = useTransition();
    const [price, setPrice] = useState<number | null>(null);

    const handleUpdate = async () => {
        startTransition(async () => {
            const result = await updatePrice();
            setPrice(result.newPrice);
        });
    };

    return (
        <div className="p-8 rounded-[40px] bg-white/2 border border-white/5 space-y-8 flex flex-col items-center text-center">
            <div className="space-y-2">
                <h4 className="text-xl font-black italic uppercase text-emerald-400">On-Demand Control</h4>
                <p className="text-sm text-white/40 italic max-w-md">
                    Cập nhật giá ở Database và lệnh cho Server xóa cache ngay lập tức bằng `revalidateTag`.
                </p>
            </div>

            <button
                onClick={handleUpdate}
                disabled={isPending}
                className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl shadow-emerald-900/20 disabled:opacity-50 flex items-center gap-3"
            >
                {isPending ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                    "Update Master Price"
                )}
            </button>

            <div className="w-full max-w-lg p-5 bg-black/40 rounded-2xl border border-white/5 space-y-3 text-left">
                <p className="text-[10px] font-black uppercase text-emerald-400/60 tracking-widest">Server-side implementation:</p>
                <div className="font-mono text-[10px] text-white/50 space-y-1">
                    <p>{"export async function updatePrice() {"}</p>
                    <p className="pl-4">{"await db.update(...);"}</p>
                    <p className="pl-4 text-emerald-400">{"revalidatePath('/dashboard'); // Clear cache"}</p>
                    <p className="pl-4">{"return { success: true };"}</p>
                    <p>{"}"}</p>
                </div>
            </div>

            {price && (
                <div className="animate-in fade-in slide-in-from-top-4">
                    <p className="text-[10px] font-bold text-emerald-400/60 uppercase">Dữ liệu mới đã được ghi!</p>
                </div>
            )}
        </div>
    );
};

// --- 3. Memoization Theory ---
export const MemoizationVisual = () => {
    return (
        <div className="p-10 rounded-[40px] bg-indigo-500/5 border border-indigo-500/10 space-y-10">
            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold italic uppercase text-indigo-400 tracking-tight">Request Memoization</h3>
                <p className="text-sm text-white/40 italic">Cùng một request, nhiều component gọi, nhưng chỉ 1 lần thực hiện.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <div className="relative p-6 bg-black/40 rounded-3xl border border-white/5 space-y-4 overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-6xl">🔄</div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-black">1</span>
                                <p className="text-[10px] text-white/60">Component A calls <code className="text-indigo-300">getUser()</code></p>
                            </div>
                            <div className="w-px h-6 bg-indigo-500/20 ml-3"></div>
                            <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-black">2</span>
                                <p className="text-[10px] text-white/60">Component B calls <code className="text-indigo-300">getUser()</code></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                     <p className="text-xs text-white/50 leading-relaxed italic border-l-2 border-indigo-500/50 pl-4 py-2">
                        Next.js tự động cache các hàm <code className="text-indigo-400 font-bold">fetch</code> (và các hàm wrap trong <code className="text-indigo-400 font-bold">React.cache</code>) trong suốt vòng đời của một request. Điều này giúp bạn tránh được việc truyền dữ liệu qua props (Prop Drilling).
                    </p>
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="text-[10px] font-black text-indigo-300 uppercase mb-1">Impact:</p>
                        <p className="text-[10px] text-indigo-200/60">Giảm 50-80% số lượng truy vấn trùng lặp lên Database/API trong cùng một lần render trang.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
