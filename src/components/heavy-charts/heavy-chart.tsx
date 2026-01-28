// src/components/heavy-charts/heavy-chart.tsx
export default function HeavyChart() {
  return (
    <div className="p-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-end gap-2 h-32 mb-4">
          <div className="w-8 bg-blue-500 rounded-t-lg animate-[bounce_2s_infinite]" style={{ height: '60%' }}></div>
          <div className="w-8 bg-purple-500 rounded-t-lg animate-[bounce_2.5s_infinite]" style={{ height: '90%' }}></div>
          <div className="w-8 bg-blue-400 rounded-t-lg animate-[bounce_1.5s_infinite]" style={{ height: '40%' }}></div>
          <div className="w-8 bg-purple-400 rounded-t-lg animate-[bounce_3s_infinite]" style={{ height: '75%' }}></div>
        </div>
        <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Heavy Visualization Data</p>
      </div>
    </div>
  );
}
