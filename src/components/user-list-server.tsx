import { UserService } from "@/services/user-service";
import { UserCard } from "./user-card";

export const UserListServer = async () => {
  // Direct call to service on Server Component
  const users = await UserService.getUsers();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">Server-side Fetching (Initial)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.slice(0, 4).map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
