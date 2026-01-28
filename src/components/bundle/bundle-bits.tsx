"use client";

import React, { useState } from "react";
import { Button } from "@/lib/ui-kit/button";

// --- 1. Barrel Imports Comparison ---
export const BarrelComparison = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                    <span>Barrel (Bad)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                    <p className="text-white/20 mb-1">// Loads the entire UI-Kit bundle</p>
                    <p>import {"{ Button }"} from "@/lib/ui-kit";</p>
                </div>
                <p className="text-[10px] text-white/30 italic">Gây lãng phí bundle size do kéo theo những component không dùng tới.</p>
            </div>

            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                    <span>Direct (Good)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                    <p className="text-white/20 mb-1">// Optimized: Only loads the button</p>
                    <p>import {"{ Button }"} from "@/lib/ui-kit/button";</p>
                </div>
                <p className="text-[10px] text-white/30 italic">Tree-shaking hoạt động hoàn hảo, giảm kích thước gói JavaScript.</p>
            </div>
        </div>
    );
};

// --- 2. Analytics Loader Visual ---
export const AnalyticsVisual = () => {
    const [loaded, setLoaded] = useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
                <span>Script Deferring</span>
                {loaded && <span className="px-2 py-0.5 bg-blue-500/20 rounded-full text-[8px] animate-pulse uppercase">Loaded</span>}
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-blue-300/80">
                <p className="text-white/20 mb-1">// Low priority: Load after hydration</p>
                <p>{"<Script strategy=\"afterInteractive\" />"}</p>
            </div>
            <p className="text-[10px] text-white/30 italic">
                Các script bên thứ ba (Analytics, Chat) được tải muộn hơn để không cản trở LCP (Largest Contentful Paint).
            </p>
        </div>
    );
};

// --- 3. UI Kit Showcase ---
export const UiKitShowcase = () => {
    return (
        <div className="p-6 rounded-3xl bg-cyan-500/5 border border-cyan-500/10 flex flex-col items-center justify-center space-y-4 py-12">
            <span className="text-[10px] font-black uppercase text-cyan-500/40 tracking-[0.4em]">UI Kit Bit</span>
            <Button>Optimized UI Kit Button</Button>
            <p className="text-[10px] text-white/20 text-center max-w-50">
                Component này được import trực tiếp từ file vật lý để tiết kiệm bundle.
            </p>
        </div>
    );
};
