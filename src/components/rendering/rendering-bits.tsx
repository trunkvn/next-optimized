"use client";

import React, { useState, useTransition } from "react";

// --- 1. rendering-conditional-render ---
export const ConditionalBad = ({ count }: { count: number }) => {
  return (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
        <span>Conditional (Bad)</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 italic">
        <p className="text-white/20 mb-1">// Shows "0" if count is 0</p>
        <p>{"{count && <p>Message</p>}"}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg text-xs text-center border border-white/5 h-10 flex items-center justify-center">
        {count && <p className="text-red-400">Bạn có {count} thông báo mới</p>}
        {count === 0 && <span className="text-red-500/50 underline decoration-double">0</span>}
      </div>
    </div>
  );
};

export const ConditionalGood = ({ count }: { count: number }) => {
  return (
    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
        <span>Conditional (Good)</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
        <p className="text-white/20 mb-1">// Safe: No leaking numbers</p>
        <p>{"{count > 0 ? <p>Message</p> : null}"}</p>
      </div>
      <div className="p-3 bg-white/5 rounded-lg text-xs text-center border border-white/5 h-10 flex items-center justify-center">
        {count > 0 ? <p className="text-green-400">Bạn có {count} thông báo mới</p> : <span className="text-white/20 italic">Nothing rendered</span>}
      </div>
    </div>
  );
};

// --- 2. rendering-animate-svg-wrapper ---
export const SvgAnimationBad = () => (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
            <span>SVG Element (Bad)</span>
        </div>
        <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
            <p className="text-white/20 mb-1">// Browser re-calculates paths</p>
            <p className="truncate">{"<svg className=\"animate-spin\">...</svg>"}</p>
        </div>
        <div className="flex justify-center">
            <svg className="w-12 h-12 text-red-500 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
        </div>
    </div>
);

export const SvgAnimationGood = () => (
    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
            <span>Wrapper Div (Good)</span>
        </div>
        <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
            <p className="text-white/20 mb-1">// Faster: Only transforms div</p>
            <p className="truncate">{"<div className=\"animate-spin\"><svg /></div>"}</p>
        </div>
        <div className="flex justify-center">
            <div className="w-12 h-12 animate-spin [animation-duration:1.5s]">
                <svg className="w-full h-full text-green-500" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            </div>
        </div>
    </div>
);

// --- 3. rendering-hoist-jsx ---
const STATIC_BADGE = (
  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-[10px] font-black uppercase tracking-tighter italic">
    Optimized Asset
  </span>
);

export const HoistDemo = () => {
    return (
        <div className="p-6 rounded-2xl bg-white/2 border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/30 tracking-widest">
                <span>JSX Hoisting</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-purple-300/80">
                <p className="text-white/20 mb-1">// Defined outside. Never re-creates.</p>
                <p>const STATIC_UI = {"<Badge />"};</p>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-white/40">Static Component:</span>
                {STATIC_BADGE}
            </div>
        </div>
    );
};

// --- 4. rendering-content-visibility ---
export const LongListGood = () => {
    const items = Array.from({ length: 100 }, (_, i) => i);
    return (
        <div className="p-6 rounded-3xl bg-pink-500/5 border border-pink-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-pink-400 tracking-widest">
                <span>Large List Rendering</span>
            </div>
            <div className="max-h-64 overflow-auto space-y-2 p-2 scrollbar-thin scrollbar-thumb-white/10">
                {items.map(i => (
                    <div 
                        key={i} 
                        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 40px' }}
                        className="p-3 bg-black/20 rounded-xl border border-white/5 text-[10px] text-white/50 flex items-center gap-3"
                    >
                        <span className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold">#{i}</span>
                        <span>Item only paints when visible on screen.</span>
                    </div>
                ))}
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-pink-200/60">
                <p className="text-white/20 mb-1">// Extreme FPS gain on mobile</p>
                <p>content-visibility: auto;</p>
            </div>
        </div>
    );
};

// --- 5. rendering-usetransition-loading ---
export const TransitionLoadingDemo = () => {
    const [isPending, startTransition] = useTransition();
    const [data, setData] = useState<string[]>([]);

    const loadMore = () => {
        startTransition(async () => {
            await new Promise(r => setTimeout(r, 1500));
            setData(prev => [...prev.slice(-4), `Data Item ${prev.length + 1}`]);
        });
    };

    return (
        <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-400 tracking-widest">
                <span>Transition State</span>
                {isPending && <span className="px-2 py-0.5 bg-blue-500/20 rounded-full animate-pulse text-[8px]">Processing</span>}
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-blue-300/80">
                <p className="text-white/20 mb-1">// Deferred update without blocking</p>
                <p>const [isPending, start] = useTransition();</p>
            </div>
            <button 
                onClick={loadMore}
                disabled={isPending}
                className="w-full py-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
            >
                {isPending ? "Loading..." : "Add Content"}
            </button>
            <div className="space-y-1 pl-2">
                {data.map((d, i) => <div key={i} className="text-[10px] text-white/40 border-l border-blue-500/30 pl-3">{d}</div>)}
            </div>
        </div>
    );
};
