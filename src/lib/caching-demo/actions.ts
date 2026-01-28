"use server";

import { revalidatePath, revalidateTag } from "next/cache";

// Giả lập database cho sản phẩm
let productPrice = 99.99;
let buildTimePrice = 88.22; // Giá trị "đóng băng" từ lúc build
let lastUpdated = new Date().toISOString();
let isrValue = 99.99;
let isrLastUpdate = Date.now();

export async function getProductData(strategy: 'static' | 'isr' | 'dynamic') {
  // Giả lập độ trễ mạng
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (strategy === 'static') {
    return { price: buildTimePrice, updatedAt: new Date(2025, 0, 1).toISOString(), id: "static" };
  }
  
  if (strategy === 'isr') {
    // Giả lập ISR: mỗi 30s mới cập nhật giá trị mới từ DB
    const now = Date.now();
    if (now - isrLastUpdate > 30000) {
        isrValue = productPrice;
        isrLastUpdate = now;
    }
    return { price: isrValue, updatedAt: new Date(isrLastUpdate).toISOString(), id: "isr" };
  }

  // Dynamic: Luôn lấy giá mới nhất
  return {
    price: productPrice,
    updatedAt: new Date().toISOString(),
    id: "dynamic"
  };
}

export async function updatePrice() {
  // Giả lập update DB
  productPrice = Number((Math.random() * 100 + 50).toFixed(2));
  lastUpdated = new Date().toISOString();
  
  console.log(`[Server] Price updated to: ${productPrice}`);
  
  // Revalidate the caching demo page
  revalidatePath("/caching");
  // Hoặc revalidatePath("/caching");
  
  return { success: true, newPrice: productPrice };
}

export async function forceRevalidate() {
    revalidatePath("/caching");
    return { success: true };
}
