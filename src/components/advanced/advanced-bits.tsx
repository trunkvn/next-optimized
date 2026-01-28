"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useLatest } from "@/hooks/use-latest";

// --- 1. Stable Callbacks (useLatest) ---
export const StableCallbackBad = () => {
  const [count, setCount] = useState(0);
  const [renders, setRenders] = useState(0);

  // SAI: Callback phụ thuộc vào count, dẫn đến định danh thay đổi liên tục
  const onSomething = useCallback(() => {
    // some logic using count
  }, [count]);

  useEffect(() => {
    const timer = setInterval(onSomething, 2000);
    setRenders(r => r + 1);
    return () => clearInterval(timer);
  }, [onSomething]); // RE-RUNS every time count changes

  return (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-500 tracking-widest">
        <span>Unstable (Bad)</span>
        <span className="px-2 py-0.5 bg-red-500/10 rounded">Resubscribes: {renders}</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
        <p className="text-white/20 mb-1">// Callback changes identity on count change</p>
        <p>const fn = useCallback(() ={">"} ..., [count]);</p>
        <p>useEffect(() ={">"} ..., [fn]);</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={() => setCount(c => c + 1)} 
          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all"
        >
          Increment Count: {count}
        </button>
        <p className="text-[10px] text-white/20 italic text-center leading-tight">
          Mỗi lần count thay đổi, `setInterval` cũ bị xoá và tạo mới. Cực kỳ lãng phí nếu count thay đổi nhanh.
        </p>
      </div>
    </div>
  );
};

export const StableCallbackGood = () => {
  const [count, setCount] = useState(0);
  const [renders, setRenders] = useState(0);
  
  // ĐÚNG: Stable identity dùng ref (thông qua useLatest)
  const callbackRef = useLatest(() => {
    // console.log("Latest count:", count);
  });

  useEffect(() => {
    const timer = setInterval(() => callbackRef.current(), 2000);
    setRenders(r => r + 1);
    return () => clearInterval(timer);
  }, []); // Cực kỳ ổn định: Effect chỉ chạy 1 lần duy nhất

  return (
    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-500 tracking-widest">
        <span>Stable (Good)</span>
        <span className="px-2 py-0.5 bg-green-500/10 rounded">Resubscribes: {renders}</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80">
        <p className="text-white/20 mb-1">// Reference is stable, value is always latest</p>
        <p>const ref = useLatest(() ={">"} ...);</p>
        <p>useEffect(() ={">"} ..., []);</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button 
          onClick={() => setCount(c => c + 1)} 
          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold transition-all"
        >
          Increment Count: {count}
        </button>
        <p className="text-[10px] text-white/20 italic text-center leading-tight">
          Effect không bao giờ bị khởi tạo lại, nhưng listener vẫn luôn truy cập được `count` mới nhất qua Ref.
        </p>
      </div>
    </div>
  );
};

// --- 2. Single Initialization Pattern ---
let globalWasInitialized = false;

export const InitOnceDemo = () => {
  const [msg, setMsg] = useState("Standby...");

  const initializeApp = () => {
    if (typeof window === "undefined" || globalWasInitialized) return;
    console.log("[Init] Core engine activated exactly once.");
    globalWasInitialized = true;
    setMsg("Core Initialized!");
  };

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 space-y-6 text-center max-w-sm mx-auto">
      <div className="flex flex-col items-center space-y-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${globalWasInitialized ? 'bg-indigo-500 shadow-lg shadow-indigo-500/40 text-white' : 'bg-white/5 text-white/20'}`}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
          </svg>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-black uppercase italic tracking-tighter text-indigo-400">{msg}</p>
          <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">Safe Init Pattern</p>
        </div>
      </div>
      
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-indigo-300/80 text-left">
        <p className="text-white/20 mb-1">// Avoids double-calls in Strict Mode</p>
        <p>if (initialized) return;</p>
        <p>runHeavyInit();</p>
        <p>initialized = true;</p>
      </div>
    </div>
  );
};
