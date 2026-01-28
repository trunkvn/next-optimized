"use server";

import { revalidatePath } from "next/cache";
// import { unstable_after as after } from "next/server"; // Nếu Next 15

// 3. server-auth-actions: Kiểm tra quyền trước khi xử lý
export async function updateProject(formData: FormData) {
  // Giả lập check auth
  const isAuthorized = false; // Demo trường hợp không có quyền
  
  if (!isAuthorized) {
    throw new Error("Unauthorized: Bạn cần quyền Admin để sửa dự án!");
  }

  // Logic xử lý DB...
  console.log("Saving project...");
  
  // 7. server-after-nonblocking: Chạy task không cản trở response
  // Chú ý: after() yêu cầu config experimental: { after: true } trong next.config.ts
  // Ở đây demo logic: Gửi email/log sau khi đã trả về kết quả cho user
  
  /* 
  after(() => {
    console.log("Logging action to analytics node after request finished...");
  });
  */

  revalidatePath("/server-performance");
  return { success: true };
}
