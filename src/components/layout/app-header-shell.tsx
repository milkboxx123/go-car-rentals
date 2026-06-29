import { AppHeader } from "@/components/layout/app-header";

import {

  getUserDisplayName,

  getUserInitials,

} from "@/lib/auth";

import { getCurrentUser } from "@/lib/auth-server";

import { getFavoriteCount } from "@/lib/favorites-server";



export interface AppHeaderShellProps {
  className?: string;
}

export async function AppHeaderShell({ className }: AppHeaderShellProps = {}) {
  const user = await getCurrentUser();
  const favoritesCount = user ? await getFavoriteCount(user.id) : undefined;

  return (
    <AppHeader
      className={className}
      userName={user ? getUserDisplayName(user) : "Guest"}
      userInitials={user ? getUserInitials(user) : "G"}
      isAuthenticated={Boolean(user)}
      favoritesCount={favoritesCount}
    />
  );
}


