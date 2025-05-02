import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export const Profile = () => {
  const { user, isLoading } = useAuth0();

  return (
    <div>
      <Avatar>
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <>
            <AvatarImage src={user?.picture} />
            <AvatarFallback className="text-slate-500 dark:text-slate-400">
              {user?.name?.split(" ")[0]}
            </AvatarFallback>
          </>
        )}
      </Avatar>
    </div>
  );
};
