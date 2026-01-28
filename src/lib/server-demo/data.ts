import { cache } from "react";

// Giả lập một Database
const mockData: Record<string, any> = {
  "1": { id: 1, name: "Project Alpha", details: "Very heavy data...", secret: "hidden-key" },
  "2": { id: 2, name: "Project Beta", details: "Another heavy object...", secret: "top-secret" },
};

// 1. server-cache-react: Cache theo từng request (Request-level)
export const getProjectDetails = cache(async (id: string) => {
  console.log(`[DB] Fetching details for ${id}...`);
  await new Promise(r => setTimeout(r, 1000)); // Giả lập chậm
  return mockData[id];
});

// 2. server-cache-lru: Cache xuyên suốt các request (Shared-level)
// Ở đây demo bằng một Map đơn giản để minh họa cơ chế LRU
const globalCache = new Map();
export const getGlobalConfig = async () => {
  if (globalCache.has("config")) return globalCache.get("config");
  
  console.log("[CONFIG] Fetching slow global config...");
  await new Promise(r => setTimeout(r, 2000));
  const config = { theme: "dark", version: "4.0" };
  globalCache.set("config", config);
  return config;
};
