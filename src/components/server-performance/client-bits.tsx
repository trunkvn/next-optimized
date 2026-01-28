"use client";

import { updateProject } from "@/app/server-performance/actions";
import { useState } from "react";

export const ServerActionDemo = () => {
  const [msg, setMsg] = useState("");

  return (
    <div className="p-6 rounded-2xl bg-white/2 border border-white/10 space-y-4">
      <h3 className="text-red-400 font-bold text-sm uppercase">1. server-auth-actions</h3>
      <p className="text-white/40 text-xs italic">Thử nhấn nút để thấy Server Action chặn request trái phép.</p>
      
      <form action={async (formData) => {
        try {
          await updateProject(formData);
        } catch (e: any) {
          setMsg(e.message);
        }
      }}>
        <button className="w-full py-2 bg-red-600/20 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-600/30 transition-all">
          Update Secure Project
        </button>
      </form>
      {msg && <p className="text-xs text-red-500 animate-pulse">{msg}</p>}
    </div>
  );
};

// 5. server-serialization: SAI - Truyền object quá lớn
export const DataBloated = ({ project }: { project: any }) => {
  return (
    <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
      <h3 className="text-red-400 font-bold text-sm uppercase">Serialization (Bad)</h3>
      <p className="text-white/40 text-[10px] italic">
         Truyền toàn bộ Object Database bao gồm cả dữ liệu nhạy cảm hoặc thừa thãi.
      </p>
      <div className="p-3 bg-black/20 rounded-lg border border-red-500/10 text-[10px] font-mono text-red-300/60 truncate">
        JSON.stringify(props.project)
      </div>
    </div>
  );
};

// 5. server-serialization: ĐÚNG - Chỉ truyền dữ liệu cần thiết
export const DataMinimalist = ({ projectName, id }: { projectName: string, id: number }) => {
  return (
    <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 space-y-2">
      <h3 className="text-green-400 font-bold text-sm uppercase">Serialization (Good)</h3>
      <p className="text-white/40 text-[10px] italic">
         Chỉ truyền những gì thực sự cần thiết cho UI.
      </p>
      <div className="p-3 bg-black/20 rounded-lg border border-green-500/10 text-xs">
        {projectName} (ID: {id})
      </div>
    </div>
  );
};
