import { PostService } from "@/services/post-service";

export const UserPosts = async ({ userId }: { userId: number }) => {
  // Component này tự fetch dữ liệu phụ thuộc
  const posts = await PostService.getPosts();
  const userPosts = posts.filter(p => p.userId === userId).slice(0, 3);

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-bold text-white/40 uppercase">User's Recent Posts:</h4>
      {userPosts.map(post => (
        <div key={post.id} className="p-3 bg-white/5 rounded-lg border border-white/5 text-sm">
          {post.title}
        </div>
      ))}
    </div>
  );
};
