"use client";

import React, { useOptimistic, useTransition, useRef } from "react";
import { useFormStatus } from "react-dom";
import { addMessage, deleteMessage } from "@/lib/forms-demo/actions";

// --- 1. Form Status Button ---
export const SubmitButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`relative px-6 py-3 rounded-xl font-black uppercase italic tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${className}`}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// --- 2. Optimistic List Comparison ---
type Message = { id: string; text: string; sending?: boolean };

export const OptimisticDemo = ({ initialMessages }: { initialMessages: Message[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    initialMessages,
    (state, newMessage: Message) => [...state, newMessage]
  );

  async function clientAction(formData: FormData) {
    const text = formData.get("message") as string;
    if (!text) return;

    // 1. Clear form immediately
    formRef.current?.reset();

    // 2. Add optimistic item
    addOptimisticMessage({
      id: Math.random().toString(36),
      text,
      sending: true,
    });

    // 3. Trigger server action
    await addMessage(formData);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Visual Explanation */}
      <div className="space-y-6">
        <div className="p-8 rounded-[40px] bg-emerald-500/5 border border-white/5 space-y-6">
          <h3 className="text-xl font-bold italic tracking-tight uppercase text-emerald-400">Optimistic Pattern</h3>
          <p className="text-sm text-white/50 leading-relaxed italic">
            "Đừng bắt người dùng phải chờ đợi mạng." Hiển thị kết quả dự kiến ngay lập tức và âm thầm xác nhận với máy chủ ở chế độ nền.
          </p>
          <div className="p-4 bg-black/40 rounded-xl font-mono text-[10px] text-emerald-300/80 space-y-2">
            <p className="text-white/20">// React 18+ Hook</p>
            <p>const [opt, addOpt] = useOptimistic(list);</p>
            <p className="text-white/20 mt-2">// In transition/action</p>
            <p>addOpt(newItem);</p>
            <p>await serverAction(formData);</p>
          </div>
        </div>

        <form ref={formRef} action={clientAction} className="space-y-4">
          <input
            name="message"
            placeholder="Type a message..."
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-hidden focus:border-emerald-500/50 transition-all text-sm"
          />
          <SubmitButton className="w-full bg-linear-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-900/20">
            Send Message
          </SubmitButton>
        </form>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase text-white/20 tracking-widest text-center">Live Feed (3s Network Latency)</p>
        <div className="space-y-3 min-h-75 p-6 rounded-[40px] bg-white/2 border border-white/5">
          {optimisticMessages.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all duration-500 ${
                m.sending 
                  ? "bg-white/5 border-white/10 opacity-50 italic translate-x-4" 
                  : "bg-emerald-500/10 border-emerald-500/20"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm">{m.text}</span>
                {m.sending && (
                  <span className="text-[8px] font-black uppercase text-emerald-400 animate-pulse">Syncing...</span>
                )}
              </div>
            </div>
          ))}
          {optimisticMessages.length === 0 && (
            <div className="h-full flex items-center justify-center text-white/10 italic text-sm">
              No messages yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- 3. Form Validation Demo ---
export const ValidationDemo = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);
        startTransition(async () => {
            const result = await addMessage(formData);
            if (result?.error) {
                setError(result.error);
            }
        });
    }

    return (
        <div className="p-10 rounded-[40px] bg-white/2 border border-white/5 space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h4 className="text-2xl font-black italic tracking-tighter uppercase text-emerald-400">Server-Side Validation</h4>
                <p className="text-sm text-white/40 italic">Kết hợp `useTransition` và `Server Actions` để xử lý lỗi mượt mà.</p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/40 tracking-widest px-2">Validation Rule: Min 3 chars</label>
                    <input
                        name="message"
                        placeholder="Try a short message..."
                        className={`w-full px-6 py-4 bg-black/40 border rounded-2xl focus:outline-hidden transition-all text-sm ${error ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {error && (
                        <p className="text-[10px] font-bold text-red-400 px-2 animate-in fade-in slide-in-from-top-1">
                            ⚠️ {error}
                        </p>
                    )}
                </div>
                <button
                    disabled={isPending}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase italic tracking-widest transition-all disabled:opacity-50"
                >
                    {isPending ? "Validating..." : "Test Validation"}
                </button>
            </form>
        </div>
    );
};
