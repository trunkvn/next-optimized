# Next.js Performance Encyclopedia

Một dự án demo chuyên sâu về các kỹ thuật tối ưu hóa hiệu năng, trải nghiệm người dùng (UX) và SEO trong Next.js App Router. Được chế tác với phong cách thiết kế **Dark Premium**, dự án này phục vụ như một cuốn sổ tay tương tác cho các nhà phát triển muốn làm chủ Next.js.

## 🚀 Tính năng chính

Dự án bao gồm 12 chuyên mục demo cốt lõi, mỗi chuyên mục tập trung vào một khía cạnh cụ thể của hiệu suất:

### 1. Rendering Strategies
So sánh chi tiết giữa **Static Site Generation (SSG)**, **Server-Side Rendering (SSR)** và **Incremental Static Regeneration (ISR)**. Giúp bạn hiểu khi nào nên dùng loại nào để cân bằng giữa tốc độ và độ tươi của dữ liệu.

### 2. Server Performance
Tối ưu hóa Server Components bằng cách giảm kích thước Payload truyền xuống Client. Demo kỹ thuật lọc dữ liệu nhạy cảm và primitive values.

### 3. Client Fetching vs Server Fetching
Minh họa sự khác biệt về hiệu năng và UX khi lấy dữ liệu tại Client (SWR/React Query) so với Server (Server Components).

### 4. Bundle Optimization
Kỹ thuật sử dụng `next/dynamic` để lazy load các thành phần nặng (như Chart, Editor), giúp giảm đáng kể thời gian tải trang ban đầu (FCP).

### 5. JavaScript Execution
Tối ưu hóa các vòng lặp và xử lý dữ liệu lớn để tránh làm nghẽn Main Thread, đảm bảo giao diện luôn mượt mà.

### 6. Re-render Optimization
Sử dụng `useMemo`, `useCallback` và `React.memo` đúng cách để ngăn chặn các lần render thừa thãi gây giật lag UI.

### 7. Waterfall Patterns
Nhận biết và khắc phục lỗi "Request Waterfall" bằng cách sử dụng `Promise.all` hoặc cơ chế song song của Server Components.

### 8. Forms & Optimistic UI
Xây dựng trải nghiệm "không độ trễ" với `useOptimistic` và `useFormStatus`. Xử lý mutation dữ liệu chuyên nghiệp với Server Actions.

### 9. Image & Media Mastery
Tối ưu hóa tài nguyên nặng nhất trên web với `next/image`, các định dạng hiện đại (AVIF/WebP), và thuộc tính `priority` cho các ảnh LCP.

### 10. Caching & Revalidation
Làm chủ hệ thống Caching của Next.js (Data Cache, Request Memoization). Demo các chiến lược `revalidatePath` và `revalidateTag`.

### 11. Accessibility & SEO (Premium UX)
Xây dựng ứng dụng hòa nhập với Semantic HTML, Focus Management (WCAG standards) và nhúng Structured Data (JSON-LD) cho Google Search.

### 12. Advanced Patterns
Các kỹ thuật chuyên sâu cho thư viện và ứng dụng quy mô lớn như `useLatest` hook hay quản lý Stable Callbacks.

## 🛠 Công nghệ sử dụng

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS (v4)
- **Language:** TypeScript
- **Design:** Dark Mode Premium, Glassmorphism, Micro-animations.

## 📦 Cài đặt và Chạy thử

1. Clone dự án:
   ```bash
   git clone ...
   cd my-app
   ```

2. Cài đặt dependencies:
   ```bash
   npm install
   ```

3. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```

4. Truy cập: `http://localhost:3000`

## 🎨 Tác giả

Dự án được thực hiện bởi **Gnoud**.

---
© 2026 Crafted by Gnoud • Vercel Performance Standards
