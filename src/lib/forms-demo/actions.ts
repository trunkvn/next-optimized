"use server";

import { revalidatePath } from "next/cache";

// Giả lập database đơn giản
let messages: { id: string; text: string }[] = [
  { id: "1", text: "Welcome to the Optimistic UI demo!" },
];

export async function getMessages() {
  return messages;
}

export async function addMessage(formData: FormData) {
  const text = formData.get("message") as string;
  
  if (!text || text.length < 3) {
    return { error: "Message must be at least 3 characters." };
  }

  // Giả lập độ trễ mạng cực lớn (3 giây) để thấy rõ sự khác biệt
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const newMessage = {
    id: Math.random().toString(36).substring(7),
    text,
  };

  messages.push(newMessage);
  revalidatePath("/forms");

  return { success: true };
}

export async function deleteMessage(id: string) {
    // Giả lập độ trễ
    await new Promise((resolve) => setTimeout(resolve, 1000));
    messages = messages.filter(m => m.id !== id);
    revalidatePath("/forms");
    return { success: true };
}
