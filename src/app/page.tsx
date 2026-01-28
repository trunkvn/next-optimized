import Link from "next/link";

const CATEGORIES = [
  // {
  //   title: "Project Foundation",
  //   icon: "🏗️",
  //   href: "/demo",
  //   color: "from-blue-500 to-cyan-500",
  //   description: "Cấu trúc thư mục chuẩn và flow gọi API tái sử dụng cho cả Server & Client.",
  //   rules: ["Folder Structure", "API Client Wrapper", "Service Layer"]
  // },
  {
    title: "Eliminating Waterfalls",
    icon: "🌊",
    href: "/waterfall",
    color: "from-cyan-500 to-teal-500",
    description: "Xử lý các request độc lập song song và stream dữ liệu phụ thuộc với Suspense.",
    rules: ["async-parallel", "async-suspense-boundaries"]
  },
  {
    title: "Bundle Optimization",
    icon: "📦",
    href: "/bundle",
    color: "from-purple-500 to-indigo-500",
    description: "Giảm dung lượng file tải về bằng cách tải động (Dynamic) và tránh file tập trung (Barrel).",
    rules: ["bundle-barrel", "bundle-dynamic", "bundle-defer"]
  },
  {
    title: "Server Performance",
    icon: "🖥️",
    href: "/server-performance",
    color: "from-green-500 to-emerald-500",
    description: "Tối ưu hóa phản hồi từ Server qua Caching, Serialization và Non-blocking tasks.",
    rules: ["server-cache", "server-auth-actions", "server-after"]
  },
  {
    title: "Client Fetching",
    icon: "🖱️",
    href: "/client-fetching",
    color: "from-yellow-500 to-orange-500",
    description: "Xử lý dữ liệu tại trình duyệt mượt mà, chống trùng lặp request và rò rỉ bộ nhớ.",
    rules: ["client-swr-dedup", "passive-listeners", "storage-versioning"]
  },
  {
    title: "Re-render Optimization",
    icon: "🔄",
    href: "/re-render",
    color: "from-pink-500 to-rose-500",
    description: "Loại bỏ Render thừa thãi bằng Lazy Init, Derived State và sử dụng Refs thông minh.",
    rules: ["lazy-state", "functional-setstate", "transient-refs"]
  },
  {
    title: "Rendering Performance",
    icon: "🎨",
    href: "/rendering",
    color: "from-fuchsia-500 to-purple-600",
    description: "Tối ưu hóa tốc độ vẽ giao diện với Content Visibility và thuật toán Animation nhẹ.",
    rules: ["content-visibility", "hoist-jsx", "svg-wrapper"]
  },
  {
    title: "JavaScript Performance",
    icon: "⚡",
    href: "/java-script",
    color: "from-amber-400 to-yellow-600",
    description: "Benchmark xử lý dữ liệu lớn: Map vs Array, gom nhóm CSS và vòng lặp tối ưu.",
    rules: ["js-index-maps", "js-combine-iterations", "css-batching"]
  },
  {
    title: "Forms & Optimistic UI",
    icon: "📝",
    href: "/forms",
    color: "from-emerald-400 to-teal-600",
    description: "Xây dựng trải nghiệm người dùng không độ trễ bằng cách dự đoán kết quả và xử lý Form chuyên nghiệp.",
    rules: ["optimistic-ui", "use-form-status", "server-validation"]
  },
  {
    title: "Image & Media Mastery",
    icon: "🖼️",
    href: "/image-optimization",
    color: "from-cyan-400 to-blue-600",
    description: "Tối ưu hóa tài nguyên nặng nhất trên web với next/image, priority loading và AVIF.",
    rules: ["image-lcp-priority", "image-avif-webp", "image-blur-placeholder"]
  },
  {
    title: "Caching & Revalidation",
    icon: "💾",
    href: "/caching",
    color: "from-indigo-500 to-purple-600",
    description: "Tối ưu hóa tốc độ tải trang bằng bộ nhớ đệm thông minh và làm tươi dữ liệu đúng lúc.",
    rules: ["data-cache", "request-memoization", "revalidate-tag"]
  },
  {
    title: "Accessibility & SEO",
    icon: "♿",
    href: "/seo-a11y",
    color: "from-blue-400 to-emerald-500",
    description: "Xây dựng UX cao cấp với Semantic HTML, quản lý Focus và dữ liệu có cấu trúc (JSON-LD).",
    rules: ["semantic-html", "focus-trap", "json-ld"]
  },
  {
    title: "Advanced Patterns",
    icon: "💎",
    href: "/advanced",
    color: "from-indigo-400 to-violet-700",
    description: "Kỹ thuật chuyên sâu cho thư viện và ứng dụng lớn: useLatest & Stable Callbacks.",
    rules: ["stable-callbacks", "init-once", "use-latest"]
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-16 px-8 border-b border-white/5 bg-[radial-gradient(circle_at_50%_-20%,var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Vercel Performance Standard
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic text-white">
            NEXT.JS <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent pr-4">OPTIMIZED</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/50 leading-relaxed font-outfit">
            Thư viện sống (Live Demo) tổng hợp toàn bộ các kỹ thuật tối ưu hóa hiệu năng chuyên nghiệp nhất cho dự án Next.js hiện đại.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="group relative block p-8 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-500 hover:scale-[1.02] hover:border-white/10"
            >
              {/* Decorative background blur */}
              <div className={`absolute -inset-2 rounded-[40px] bg-linear-to-br ${cat.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity`}></div>
              
              <div className="relative z-10 space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${cat.color} flex items-center justify-center text-3xl shadow-lg ring-1 ring-white/20 text-white`}>
                  {cat.icon}
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-blue-400 transition-colors uppercase italic">{cat.title}</h2>
                  <p className="text-sm text-white/40 leading-relaxed h-12 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.rules.map((rule, rIdx) => (
                    <span key={rIdx} className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-white/5 rounded-md border border-white/5 text-white/30 group-hover:border-white/10 group-hover:text-white/60 transition-colors">
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer / Meta */}
      <footer className="max-w-6xl mx-auto pb-20 px-8">
        <div className="p-10 rounded-[40px] border border-white/5 bg-linear-to-b from-white/3 to-transparent text-center space-y-6">
          <h3 className="text-xl font-bold italic uppercase tracking-widest text-white/60">Tại sao nên theo chuẩn này?</h3>
          <p className="text-sm text-white/30 max-w-3xl mx-auto leading-relaxed italic">
            "Hiệu năng không chỉ là về tốc độ tải trang, mà là về sự tôn trọng thời gian và thiết bị của người dùng. 
            Dự án này giúp bạn xây dựng những ứng dụng không chỉ nhanh mà còn ổn định, bảo mật và dễ dàng mở rộng."
          </p>
          <div className="pt-4 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400 italic">57+</div>
              <div className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Rules Optimized</div>
            </div>
            <div className="w-px bg-white/5"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400 italic">9</div>
              <div className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Demo Categories</div>
            </div>
            <div className="w-px bg-white/5"></div>
            <div className="text-center">
              <div className="text-2xl font-black text-pink-400 italic">100%</div>
              <div className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Performance Score</div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
            © 2026 Crafted by <span className="text-white/20 hover:text-blue-400 transition-colors cursor-default">Gnoud</span> • Vercel Performance Standards
          </p>
        </div>
      </footer>
    </main>
  );
}
