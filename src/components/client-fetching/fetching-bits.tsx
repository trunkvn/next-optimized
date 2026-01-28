"use client";

import { useEffect, useState, useRef } from "react";
import { User } from "@/types/api";
import useSWR from "swr";
import { fetcher } from "@/lib/api-client";

// --- 1. SWR Dedup vs Manual Fetch ---
export const SwrComparisonGood = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <SwrComponent name="Comp A" />
                <SwrComponent name="Comp B" />
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                <p className="text-white/20 mb-1">// Both use same key: only ONE request fired</p>
                <p>const {"{ data }"} = useSWR("/users", fetcher);</p>
            </div>
        </div>
    );
};

const SwrComponent = ({ name }: { name: string }) => {
    const { data } = useSWR<User[]>("/users", fetcher);
    return (
        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
            <p className="text-[10px] text-green-400 font-bold uppercase mb-1">{name}</p>
            <p className="text-xs text-white/40 italic">Deduplicated Request</p>
        </div>
    );
};

export const SwrComparisonBad = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <ManualFetchComponent name="Comp C" />
                <ManualFetchComponent name="Comp D" />
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 overflow-x-auto">
                <p className="text-white/20 mb-1">// Each component fires its own request</p>
                <p>useEffect(() ={">"} {"{"}</p>
                <p className="pl-4">fetch("/users").then(...)</p>
                <p>{"}"}, []);</p>
            </div>
        </div>
    );
};

const ManualFetchComponent = ({ name }: { name: string }) => {
    const [data, setData] = useState<any>(null);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(json => setData(json));
    }, []);
    return (
        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
            <p className="text-[10px] text-red-400 font-bold uppercase mb-1">{name}</p>
            <p className="text-xs text-white/40 italic">Duplicate Request</p>
        </div>
    );
};

// --- 2. Passive Listeners ---
export const ScrollTrackerGood = () => {
    const [scrollPos, setScrollPos] = useState(0);
    useEffect(() => {
        const handleScroll = () => setScrollPos(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-400 tracking-widest">
                <span>Passive (Good)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
                <p className="text-white/20 mb-1">// Doesn't block scroll animation</p>
                <p>el.addEventListener("scroll", fn, {"{ passive: true }"});</p>
            </div>
            <div className="text-xs text-white/60 font-mono">
                Scroll: {Math.round(scrollPos)}px
            </div>
        </div>
    );
};

export const ScrollTrackerBad = () => {
    const [pos, setPos] = useState(0);
    useEffect(() => {
        const handle = () => {
            for(let i=0; i<1000000; i++) {} // Fake heavy work
            setPos(window.scrollY);
        };
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);
    return (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>Non-Passive (Bad)</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 italic line-through opacity-50">
                <p>el.addEventListener("scroll", fn);</p>
            </div>
            <div className="text-xs text-white/60 font-mono">
                Scroll: {Math.round(pos)}px
            </div>
        </div>
    );
};

// --- 3. Memory Leak ---
export const MemoryLeakDemo = () => {
    return (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
                <span>Memory Leak Risk</span>
            </div>
            <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                <p className="text-white/20 mb-1">// Forgot to return clean-up function</p>
                <p>useEffect(() ={">"} {"{"}</p>
                <p className="pl-4">window.addEventListener("resize", fn);</p>
                <p>{"}"}, []);</p>
            </div>
            <p className="text-[10px] text-white/30 italic">Check console while resizing to see logs leaking after unmount.</p>
        </div>
    );
};
