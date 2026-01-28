"use client";

import React, { useState } from "react";

// Helper for large data
const LARGE_DATA = Array.from({ length: 50000 }, (_, i) => ({ id: `idx-${i}`, val: i }));
const TARGET_ID = "idx-49999";

// --- 1. Lookup Performance ---
export const LookupDemo = () => {
    const [time, setTime] = useState<{ bad: number, good: number } | null>(null);

    const runDemo = () => {
        const startBad = performance.now();
        for(let i=0; i<100; i++) {
            LARGE_DATA.find(item => item.id === TARGET_ID);
        }
        const endBad = performance.now();

        const lookupMap = new Map(LARGE_DATA.map(i => [i.id, i]));
        const startGood = performance.now();
        for(let i=0; i<100; i++) {
            lookupMap.get(TARGET_ID);
        }
        const endGood = performance.now();

        setTime({ bad: endBad - startBad, good: endGood - startGood });
    };

    return (
        <div className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-500 tracking-widest">
                <span>Map vs Array Lookup</span>
                {time && <span className="text-white/20">{(time.bad / time.good).toFixed(0)}x Faster</span>}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] space-y-2">
                    <p className="text-red-400 opacity-80">// O(N) - Linear Search</p>
                    <p className="text-red-300/60">data.find(i ={">"} i.id === key);</p>
                    <div className="h-px bg-white/5 my-2"></div>
                    <p className="text-green-400 opacity-80">// O(1) - Hash Map</p>
                    <p className="text-green-300/60">map.get(key);</p>
                </div>
            </div>

            <button onClick={runDemo} className="w-full py-3 bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 text-amber-500">
                Run Lookup Benchmark
            </button>

            {time && (
                <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/10">
                        <p className="text-[10px] text-red-400 mb-1 uppercase font-bold">Array</p>
                        <p className="text-xl text-white font-bold">{time.bad.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/10">
                        <p className="text-[10px] text-green-400 mb-1 uppercase font-bold">Map</p>
                        <p className="text-xl text-white font-bold">{time.good.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 2. Iteration Performance ---
export const IterationDemo = () => {
    const [time, setTime] = useState<{ bad: number, good: number } | null>(null);

    const runDemo = () => {
        const data = Array.from({ length: 100000 }, (_, i) => i);
        const startBad = performance.now();
        const resBad = data.filter(n => n % 2 === 0).map(n => n * 2);
        const endBad = performance.now();

        const startGood = performance.now();
        const resGood = [];
        for (let i = 0; i < data.length; i++) {
            const n = data[i];
            if (n % 2 === 0) resGood.push(n * 2);
        }
        const endGood = performance.now();

        setTime({ bad: endBad - startBad, good: endGood - startGood });
    };

    return (
        <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-500 tracking-widest">
                <span>Iteration Chaining</span>
            </div>
            
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] space-y-2">
                <p className="text-red-400 opacity-80">// 2-pass (Slow on large data)</p>
                <p className="text-red-300/60">arr.filter(...).map(...);</p>
                <div className="h-px bg-white/5 my-2"></div>
                <p className="text-green-400 opacity-80">// 1-pass (Optimal)</p>
                <p className="text-green-300/60">for(let i=0; i {"<"} len; i++) ...</p>
            </div>

            <button onClick={runDemo} className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 text-blue-400">
                Run Loop Benchmark
            </button>

            {time && (
                <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/10">
                        <p className="text-[10px] text-red-400 mb-1 uppercase font-bold">Multi-Pass</p>
                        <p className="text-xl text-white font-bold">{time.bad.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/10">
                        <p className="text-[10px] text-green-400 mb-1 uppercase font-bold">Single-Pass</p>
                        <p className="text-xl text-white font-bold">{time.good.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 3. Sorting vs Loop ---
export const MinMaxDemo = () => {
    const [time, setTime] = useState<{ bad: number, good: number } | null>(null);

    const runDemo = () => {
        const numbers = Array.from({ length: 50000 }, () => Math.random());
        const startBad = performance.now();
        const minBad = [...numbers].sort((a,b) => a-b)[0];
        const endBad = performance.now();

        const startGood = performance.now();
        let minGood = numbers[0];
        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] < minGood) minGood = numbers[i];
        }
        const endGood = performance.now();
        setTime({ bad: endBad - startBad, good: endGood - startGood });
    };

    return (
        <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-purple-500 tracking-widest">
                <span>Min/Max Operations</span>
            </div>
            
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] space-y-2">
                <p className="text-red-400 opacity-80">// O(N log N) - Overkill</p>
                <p className="text-red-300/60">[...arr].sort()[0];</p>
                <div className="h-px bg-white/5 my-2"></div>
                <p className="text-green-400 opacity-80">// O(N) - Linear</p>
                <p className="text-green-300/60">Math.min(...arr) / Loop</p>
            </div>

            <button onClick={runDemo} className="w-full py-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 text-purple-400">
                Run Min/Max Benchmark
            </button>

            {time && (
                <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/10">
                        <p className="text-[10px] text-red-400 mb-1 uppercase font-bold">Sort</p>
                        <p className="text-xl text-white font-bold">{time.bad.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/10">
                        <p className="text-[10px] text-green-400 mb-1 uppercase font-bold">Loop</p>
                        <p className="text-xl text-white font-bold">{time.good.toFixed(2)}<span className="text-xs ml-1">ms</span></p>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 4. CSS Batching ---
export const CssBatchingDemo = () => {
    return (
        <div className="p-6 rounded-3xl bg-orange-500/5 border border-orange-500/10 space-y-4 h-full flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-orange-500 tracking-widest">
                <span>DOM/CSS Batching</span>
            </div>
            <div className="space-y-4">
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] border border-red-500/10">
                    <p className="text-red-400 mb-1 uppercase font-black tracking-widest">Bad: Multiple Reflows</p>
                    <p>el.style.width = "10px";</p>
                    <p>el.style.height = "10px";</p>
                    <p>el.style.color = "red";</p>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[9px] border border-green-500/10">
                    <p className="text-green-400 mb-1 uppercase font-black tracking-widest">Good: Single Reflow</p>
                    <p>el.style.cssText = "width:10px; ...";</p>
                    <p>// Or use classList</p>
                    <p>el.classList.add("my-style");</p>
                </div>
            </div>
            <p className="text-[10px] text-white/20 italic leading-relaxed pt-2">
                Kết hợp các thay đổi CSS/DOM giúp trình duyệt chỉ phải tính toán lại (reflow) một lần duy nhất.
            </p>
        </div>
    );
};
