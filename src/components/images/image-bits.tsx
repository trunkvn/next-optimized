"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

// --- 1. Traditional vs Next/Image Comparison ---
export const ImageComparison = ({ src }: { src: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-400 tracking-widest">
          <span>Traditional {"<img>"} (Bad)</span>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={src} 
            alt="Traditional" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
          <p>{"<img src=\"/hero.jpg\" />"}</p>
        </div>
        <ul className="text-[10px] text-white/30 space-y-1 list-disc list-inside px-2">
          <li>Không tự động resize & nén</li>
          <li>Format nặng (PNG/JPG)</li>
          <li>Gây Layout Shift</li>
          <li>Không có Lazy Loading mặc định</li>
        </ul>
      </div>

      <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 space-y-4">
        <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-400 tracking-widest">
          <span>next/image (Good)</span>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-400/20 bg-white/2">
          <Image 
            src={src} 
            alt="Next.js Optimized" 
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+C+JAAIpALAnPvnNAAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-cyan-300/80">
          <p>{"<Image src=\"/hero.jpg\" fill />"}</p>
        </div>
        <ul className="text-[10px] text-cyan-400/60 space-y-1 list-disc list-inside px-2">
          <li>Tự động nén sang WebP/AVIF</li>
          <li>Lazy load mặc định</li>
          <li>Placeholder "Blur" mượt mà</li>
          <li>Zero Layout Shift</li>
        </ul>
      </div>
    </div>
  );
};

// --- 2. Interactive Size Slider ---
export const ImageInteractiveSize = ({ src }: { src: string }) => {
  const [width, setWidth] = useState(800);
  
  // Simulated size calculation (simplified model)
  const stats = useMemo(() => {
    const rawKb = (width * width * 0.0003); // Roughly proportional to area
    const optimizedKb = rawKb * 0.25; // AVIF/WebP is ~75% smaller
    return {
      raw: rawKb.toFixed(1),
      opt: optimizedKb.toFixed(1),
      savings: (((rawKb - optimizedKb) / rawKb) * 100).toFixed(0)
    };
  }, [width]);

  return (
    <div className="p-10 rounded-[40px] bg-white/2 border border-white/5 space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-cyan-400">On-the-fly Resizing</h3>
        <p className="text-sm text-white/40 italic">Thay đổi chiều rộng để thấy Next.js Image Optimizer làm việc.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6">
          <input 
            type="range" 
            min="200" 
            max="2000" 
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="relative rounded-4xl overflow-hidden border border-white/10 bg-black aspect-ratio-[16/9] shadow-2xl">
              <div 
                className="transition-all duration-300 mx-auto h-full" 
                style={{ width: `${(width / 2000) * 100}%`, minWidth: '10%' }}
              >
                  <Image src={src} alt="Scaled" fill className="object-cover" sizes="(max-width: 2000px) 100vw" />
              </div>
          </div>
        </div>

        <div className="space-y-6 p-6 rounded-3xl bg-black/40 border border-white/5">
            <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-white/20 tracking-widest">Current Width</p>
                <p className="text-3xl font-black italic text-white">{width}px</p>
            </div>
            
            <div className="h-px bg-white/5"></div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-[10px] text-white/40 uppercase font-bold">Unoptimized Size</span>
                    <span className="text-sm font-mono text-red-400">{stats.raw} KB</span>
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-[10px] text-cyan-400 uppercase font-black">Next.js AVIF Size</span>
                    <span className="text-xl font-mono text-cyan-400 font-bold">{stats.opt} KB</span>
                </div>
            </div>

            <div className="pt-4">
                <div className="px-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
                    <p className="text-xs font-bold text-cyan-400">Dung lượng tiết kiệm: ~{stats.savings}%</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Priority Demo ---
export const LcpPriorityDemo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[40px] bg-red-500/5 border border-red-500/10 space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-500 tracking-widest">
                    <span>Normal Loading (LCP Drag)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80">
                    <p className="text-white/20 mb-1">// Browser downloads JS first by default</p>
                    <p>{"<Image src=\"/hero.jpg\" />"}</p>
                </div>
                <p className="text-xs text-white/40 leading-relaxed italic">
                    Ảnh mồi (Hero) ở phía trên màn hình sẽ bị trình duyệt trì hoãn vì nó có độ ưu tiên thấp mặc định. Làm giảm điểm LCP.
                </p>
            </div>

            <div className="p-8 rounded-[40px] bg-cyan-500/5 border border-cyan-500/20 space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-cyan-500 tracking-widest">
                    <span>Priority Loading (Fast LCP)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-cyan-300/80">
                    <p className="text-white/20 mb-1">// Instructs browser to fetch ASAP</p>
                    <p>{"<Image src=\"/hero.jpg\" priority />"}</p>
                </div>
                <p className="text-xs text-white/60 leading-relaxed italic">
                    Sử dụng thuộc tính `priority` cho các ảnh cực kỳ quan trọng giúp trình duyệt tải chúng ngay lập tức, bỏ qua hàng đợi.
                </p>
            </div>
        </div>
    );
};
