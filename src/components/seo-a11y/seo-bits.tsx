"use client";

import React, { useState, useRef, useEffect } from "react";

// --- 1. Semantic vs Div-Soup ---
export const SemanticComparison = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px]">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
                <div className="flex justify-between items-center font-black uppercase text-red-400 tracking-widest">
                    <span>"Div Soup" (Bad for SEO)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-red-300/80 space-y-1">
                    <p>{"<div className=\"header\">...</div>"}</p>
                    <p>{"<div className=\"nav\">...</div>"}</p>
                    <p>{"<div className=\"main-content\">...</div>"}</p>
                </div>
                <p className="text-white/30 italic">
                    Search engines and screen readers struggle to understand the hierarchy and importance of content.
                </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
                <div className="flex justify-between items-center font-black uppercase text-emerald-400 tracking-widest">
                    <span>Semantic HTML (Good for SEO)</span>
                </div>
                <div className="p-3 bg-black/40 rounded-xl font-mono text-emerald-300/80 space-y-1">
                    <p>{"<header>...</header>"}</p>
                    <p>{"<nav aria-label=\"Main\">...</nav>"}</p>
                    <p>{"<main>...</main>"}</p>
                </div>
                <p className="text-emerald-400/60 italic">
                    Provides meaning to the structure. Improves indexing and accessibility out of the box.
                </p>
            </div>
        </div>
    );
};

// --- 2. Focus Management Demo ---
export const FocusManagementDemo = () => {
    const [isOpen, setIsOpen] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const openBtnRef = useRef<HTMLButtonElement>(null);

    // Focus Trap / Restoration
    useEffect(() => {
        if (isOpen) {
            closeBtnRef.current?.focus();
        } else {
            // Restore focus when closing
            // We use a small timeout to ensure DOM update
            const timer = setTimeout(() => openBtnRef.current?.focus(), 10);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div className="p-10 rounded-[40px] bg-white/2 border border-white/5 space-y-6 flex flex-col items-center">
            <div className="text-center space-y-2 mb-4">
                <h3 className="text-xl font-black italic uppercase text-blue-400">A11y Focus Management</h3>
                <p className="text-sm text-white/40 italic">Đảm bảo người dùng sử dụng bàn phím (Keyboard users) không bị "lạc".</p>
            </div>

            <button
                ref={openBtnRef}
                onClick={() => setIsOpen(true)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-black uppercase italic tracking-widest transition-all"
            >
                Open Accessible Modal
            </button>

            {isOpen && (
                <div 
                    role="dialog" 
                    aria-modal="true" 
                    aria-labelledby="modal-title"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
                >
                    <div className="w-full max-w-md p-8 bg-[#111] border border-white/10 rounded-3xl shadow-2xl space-y-6">
                        <h4 id="modal-title" className="text-2xl font-black italic uppercase text-white">Focus Trapped!</h4>
                        <p className="text-sm text-white/50 leading-relaxed italic">
                            Khi modal mở, phím Tab sẽ được "khóa" bên trong này và nút Đóng sẽ được focus tự động. Đây là yêu cầu bắt buộc của WCAG.
                        </p>
                        <button
                            ref={closeBtnRef}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-black uppercase italic tracking-widest transition-all"
                        >
                            Close & Restore Focus
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- 3. Structured Data (JSON-LD) Visualizer ---
export const JsonLdPreview = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Next.js Performance Pro",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "rating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "ratingCount": "1250"
        }
    };

    return (
        <div className="p-8 rounded-[40px] bg-amber-500/5 border border-amber-500/10 space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-black uppercase text-amber-400 tracking-widest">SEO: Structured Data</h3>
                <span className="text-[8px] font-bold px-2 py-0.5 bg-amber-400/10 text-amber-300 rounded border border-amber-500/20">JSON-LD</span>
            </div>
            
            <p className="text-xs text-white/40 italic leading-relaxed">
                Google sử dụng dữ liệu có cấu trúc để hiển thị "Rich Results" (như sao đánh giá, giá tiền) trên kết quả tìm kiếm.
            </p>

            <div className="p-5 bg-black/60 rounded-2xl border border-white/5 font-mono text-[10px] text-amber-200/60 overflow-x-auto">
                <pre>{JSON.stringify(jsonLd, null, 2)}</pre>
            </div>

            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-[10px] font-black text-amber-300 uppercase mb-1">Impact:</p>
                <p className="text-[10px] text-amber-200/60">Tăng tỷ lệ CTR (Click Through Rate) từ trang tìm kiếm lên tới 35%.</p>
            </div>
        </div>
    );
};
