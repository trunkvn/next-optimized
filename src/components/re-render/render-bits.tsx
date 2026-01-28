"use client";

import React, { useState, useEffect, useMemo, useRef, memo } from "react";

// --- 1. rerender-lazy-state-init ---
const computeExpensiveValue = () => {
    if (typeof window !== "undefined") {
        console.log("[Expensive] Initializing slow state...");
    }
    return Array(1000).fill(0).reduce((acc, _, i) => acc + i, 0);
};

export const LazyInitBad = () => {
    const [val] = useState(computeExpensiveValue()); 
    const [, setTick] = useState(0);
    return (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>Lazy Init (Bad)</span>
                <span className="px-2 py-0.5 bg-red-500/10 rounded">Bloated</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                <p className="text-white/20 mb-1">// Re-runs function on every render</p>
                <p>const [val] = useState(expensive());</p>
            </div>
            <button onClick={() => setTick(t => t + 1)} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all">
                Re-render me ({val})
            </button>
            <p className="text-[10px] text-white/30 italic">Hàm `expensive` chạy lặp lại vô ích trong Console.</p>
        </div>
    );
};

export const LazyInitGood = () => {
    const [val] = useState(() => computeExpensiveValue());
    const [, setTick] = useState(0);
    return (
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                <span>Lazy Init (Good)</span>
                <span className="px-2 py-0.5 bg-green-500/10 rounded">Optimized</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                <p className="text-white/20 mb-1">// Only runs once (Init only)</p>
                <p>const [val] = useState(() ={">"} expensive());</p>
            </div>
            <button onClick={() => setTick(t => t + 1)} className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs transition-all">
                Re-render me ({val})
            </button>
            <p className="text-[10px] text-white/30 italic">Hàm `expensive` chỉ chạy đúng một lần lúc ban đầu.</p>
        </div>
    );
};

// --- 2. rerender-derived-state-no-effect ---
export const DerivedStateBad = ({ items }: { items: number[] }) => {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(items.reduce((a, b) => a + b, 0));
    }, [items]);

    return (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>Derived State (Bad)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 overflow-x-auto">
                <p className="text-white/20 mb-1">// Causes SECOND render after mount</p>
                <p>useEffect(() ={">"} {"{"}</p>
                <p className="pl-4">setTotal(items.sum())</p>
                <p>{"}"}, [items]);</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-xs text-center border border-white/5">
                Total (Effect): <span className="font-bold text-red-400">{total}</span>
            </div>
        </div>
    );
};

export const DerivedStateGood = ({ items }: { items: number[] }) => {
    const total = items.reduce((a, b) => a + b, 0);
    return (
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                <span>Derived State (Good)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80 overflow-x-auto">
                <p className="text-white/20 mb-1">// Computed directly during render</p>
                <p>const total = items.sum();</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-xs text-center border border-white/5">
                Total (Direct): <span className="font-bold text-green-400">{total}</span>
            </div>
        </div>
    );
};

// --- 3. rerender-functional-setstate ---
export const CounterBad = () => {
    const [count, setCount] = useState(0);
    const handleAdd = () => {
        setCount(count + 1);
        setCount(count + 1);
    };
    return (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>Functional SetState (Bad)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                <p className="text-white/20 mb-1">// Risk of stale state</p>
                <p>setCount(count + 1);</p>
                <p>setCount(count + 1); // Still only adds 1</p>
            </div>
            <button onClick={handleAdd} className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 rounded-xl text-sm font-bold transition-all">
                Increment Count: {count}
            </button>
        </div>
    );
};

export const CounterGood = () => {
    const [count, setCount] = useState(0);
    const handleAdd = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    };
    return (
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                <span>Functional SetState (Good)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                <p className="text-white/20 mb-1">// Guaranteed latest state</p>
                <p>setCount(prev ={">"} prev + 1);</p>
                <p>setCount(prev ={">"} prev + 1); // Correctly adds 2</p>
            </div>
            <button onClick={handleAdd} className="w-full py-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/10 rounded-xl text-sm font-bold transition-all">
                Increment Count: {count}
            </button>
        </div>
    );
};

// --- 4. rerender-use-ref-transient-values ---
export const MouseTrackerBad = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const handleMove = (e: React.MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    if (typeof window !== "undefined") {
        console.log("[Render] MouseTracker (Bad) Rendering...");
    }

    return (
        <div onMouseMove={handleMove} className="h-40 p-6 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>State (Bad)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                <p className="text-white/20 mb-1">// 100+ renders per second</p>
                <p>const [pos, setPos] = useState(...);</p>
            </div>
            <div className="text-xs text-white/60 font-mono">
                X: {pos.x}, Y: {pos.y}
            </div>
        </div>
    );
};

export const MouseTrackerGood = () => {
    const posRef = useRef({ x: 0, y: 0 });
    const textRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent) => {
        posRef.current = { x: e.clientX, y: e.clientY };
        if (textRef.current) {
            textRef.current.innerText = `X: ${posRef.current.x}, Y: ${posRef.current.y}`;
        }
    };
    if (typeof window !== "undefined") {
        console.log("[Render] MouseTracker (Good) Rendered exactly ONCE.");
    }

    return (
        <div onMouseMove={handleMove} className="h-40 p-6 rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                <span>Ref (Good)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                <p className="text-white/20 mb-1">// ZERO re-renders during move</p>
                <p>const posRef = useRef(...);</p>
            </div>
            <div ref={textRef} className="text-xs text-white/60 font-mono">
                X: 0, Y: 0
            </div>
        </div>
    );
};
