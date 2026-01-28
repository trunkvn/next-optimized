import { User } from "@/types/api";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
      <h3 className="font-semibold text-lg text-white">{user.name}</h3>
      <p className="text-white/60 text-sm">{user.email}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-white/40 font-medium">
          @{user.username}
        </span>
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          {user.website}
        </a>
      </div>
    </div>
  );
};
