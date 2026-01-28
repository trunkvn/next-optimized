"use client";

import useSWR from "swr";
import { useState, useTransition } from "react";
import { fetcher } from "@/lib/api-client";
import { User } from "@/types/api";
import { UserCard } from "@/components/user-card";

export const UserListClient = () => {
  const {
    data: users,
    error,
    isLoading,
    mutate,
  } = useSWR<User[]>("/users", fetcher);

  // Best Practice: rerender-transitions
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [deferredSearch, setDeferredSearch] = useState("");

  // KHÔNG DÙNG useTransition (Lag)
  const handleSearchLag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Giả lập xử lý nặng khiến CPU bận rộn
    // Trình duyệt sẽ đợi loop này xong mới hiện chữ vào Input
    for (let i = 0; i < 100000000; i++) {}

    setDeferredSearch(value);
  };

  // CÓ DÙNG useTransition (Mượt)
  const handleSearchSmooth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value); // Hiện chữ ngay lập tức

    startTransition(() => {
      // Việc xử lý nặng này được đẩy xuống độ ưu tiên thấp
      for (let i = 0; i < 100000000; i++) {}
      setDeferredSearch(value);
    });
  };

  const filteredUsers = users
    ?.filter((u) => u.name.toLowerCase().includes(deferredSearch.toLowerCase()))
    .slice(0, 4);

  if (isLoading)
    return <div className="text-white/60">Loading client-side data...</div>;
  if (error) return <div className="text-red-400">Error loading users</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Client-side (SWR + Transition)
          {isPending ? (
            <span className="text-xs text-blue-400 animate-pulse">
              (Filtering...)
            </span>
          ) : null}
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchSmooth}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 w-full md:w-64"
          />
          <button
            onClick={() => mutate()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Best Practice: rendering-conditional-render (Avoid &&) */}
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <div className="col-span-full py-10 text-center text-white/40 border border-dashed border-white/10 rounded-xl">
            No users found matching "{deferredSearch}"
          </div>
        )}
      </div>
    </div>
  );
};
