import { UserService } from "@/services/user-service";
import { PostService } from "@/services/post-service";
import { UserPosts } from "@/components/user-posts";
import Link from "next/link";
import { Suspense } from "react";

// --- COMPONENTS ---

const WaterfallBad = async () => {
  const start = Date.now();
  const users = await UserService.getUsersNoCache(); 
  const posts = await PostService.getPostsNoCache(); 
  const duration = (Date.now() - start) / 1000;

  return (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-500 tracking-widest">
        <span>Waterfall (Bad)</span>
        <span className="px-2 py-0.5 bg-red-500/10 rounded">{duration.toFixed(2)}s</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 overflow-x-auto">
        <p className="text-white/20 mb-1">// Sequential: Total = T1 + T2</p>
        <p>const users = await getUsers();</p>
        <p>const posts = await getPosts();</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-white/5 rounded">Users: {users.length}</div>
        <div className="p-2 bg-white/5 rounded">Posts: {posts.length}</div>
      </div>
    </div>
  );
};

const WaterfallGood = async () => {
  const start = Date.now();
  const [users, posts] = await Promise.all([
    UserService.getUsers(),
    PostService.getPosts(),
  ]);
  const duration = (Date.now() - start) / 1000;

  return (
    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-green-500 tracking-widest">
        <span>Parallel (Good)</span>
        <span className="px-2 py-0.5 bg-green-500/10 rounded">{duration.toFixed(2)}s</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-green-300/80 overflow-x-auto">
        <p className="text-white/20 mb-1">// Parallel: Total = Max(T1, T2)</p>
        <p>const [u, p] = await Promise.all([</p>
        <p className="pl-4">getUsers(), getPosts()</p>
        <p>]);</p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-white/5 rounded">Users: {users.length}</div>
        <div className="p-2 bg-white/5 rounded">Posts: {posts.length}</div>
      </div>
    </div>
  );
};

const DependentBad = async () => {
  const start = Date.now();
  const users = await UserService.getUsersNoCache();
  const firstUser = users[0];
  const posts = await PostService.getPostsNoCache();
  const userPosts = posts.filter((p) => p.userId === firstUser.id).slice(0, 2);
  const duration = (Date.now() - start) / 1000;

  return (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-red-500 tracking-widest">
        <span>Blocking (Bad)</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-red-300/80 overflow-x-auto">
        <p className="text-white/20 mb-1">// Both must finish before any UI shows</p>
        <p>const users = await getUsers();</p>
        <p>const posts = await getPosts();</p>
        <p>return {"<Layout>{posts}</Layout>"}</p>
      </div>
      <div className="p-4 bg-white/5 rounded-xl">
        <p className="font-bold text-lg">{firstUser.name}</p>
        <div className="mt-4 space-y-2">
          {userPosts.map((p) => (
            <div key={p.id} className="text-xs text-white/40 italic">
              - {p.title}
            </div>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-red-400 font-mono">Total Blocked: {duration.toFixed(2)}s</div>
    </div>
  );
};

const DependentGood = async () => {
  const start = Date.now();
  const users = await UserService.getUsers();
  const firstUser = users[1];
  const duration = (Date.now() - start) / 1000;

  return (
    <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-4">
      <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-500 tracking-widest">
        <span>Streaming (Good)</span>
      </div>
      <div className="p-3 bg-black/40 rounded-xl font-mono text-[10px] text-blue-300/80 overflow-x-auto">
        <p className="text-white/20 mb-1">// Partial UI visible while data streams</p>
        <p>const users = await getUsers();</p>
        <p>return {"<Suspense><UserPosts /></Suspense>"}</p>
      </div>
      <div className="p-4 bg-white/5 rounded-xl font-outfit">
        <p className="font-bold text-lg">{firstUser.name}</p>
        <p className="text-[10px] text-blue-300 font-mono mt-1 italic">
          User found in: {duration.toFixed(2)}s
        </p>

        <div className="mt-4">
          <Suspense
            fallback={
              <div className="text-xs text-white/20 animate-pulse italic">
                Loading posts for {firstUser.name}...
              </div>
            }
          >
            <UserPosts userId={firstUser.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

// --- PAGE ---

export default function WaterfallPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-outfit">
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="space-y-4 text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent italic uppercase tracking-tighter">
            Eliminating Waterfalls
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
            Học cách Parallelize các request độc lập và Stream các request phụ thuộc để tăng tốc độ phản hồi cảm nhận.
          </p>
        </header>

        {/* 1. Independent Requests */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">1. Parallelize Independent Data</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Suspense fallback={<div className="h-48 bg-white/5 animate-pulse rounded-2xl" />}>
              <WaterfallBad />
            </Suspense>
            <Suspense fallback={<div className="h-48 bg-white/5 animate-pulse rounded-2xl" />}>
              <WaterfallGood />
            </Suspense>
          </div>
          <p className="text-xs text-white/30 text-center italic">
            Mẹo: Nếu các request không phụ thuộc vào nhau, đừng bao giờ `await` chúng lần lượt. Hãy dùng `Promise.all()`.
          </p>
        </section>

        {/* 2. Dependent Requests */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1"></div>
            <h2 className="text-xs font-black text-white/20 uppercase tracking-[0.3em]">2. Streaming Dependent Data</h2>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Suspense fallback={<div className="h-64 bg-white/5 animate-pulse rounded-2xl" />}>
              <DependentBad />
            </Suspense>
            <Suspense fallback={<div className="h-64 bg-white/5 animate-pulse rounded-2xl" />}>
              <DependentGood />
            </Suspense>
          </div>
        </section>

        <section className="p-10 rounded-[40px] bg-cyan-500/5 border border-white/5 text-center space-y-4">
            <h4 className="text-xl font-bold italic tracking-tight uppercase text-cyan-400">The Power of Streaming</h4>
            <p className="text-sm text-white/40 max-w-2xl mx-auto leading-relaxed">
               "Đừng bắt người dùng đợi toàn bộ trang web tải xong. Hãy hiện data đầu tiên ngay khi có thể, và dùng Suspense để tải data phụ thuộc sau."
            </p>
        </section>

        <div className="flex justify-center pt-8 pb-20">
            <Link href="/" className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                ← Back to Dashboard
            </Link>
        </div>
      </div>
    </main>
  );
}
