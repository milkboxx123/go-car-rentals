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
  const isAuthenticated = Boolean(user);
  const userName = user ? getUserDisplayName(user) : "Guest";
  // #region agent log
  fetch('http://127.0.0.1:7895/ingest/618db32d-237f-48fb-b96d-671b9ead087e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'08b061'},body:JSON.stringify({sessionId:'08b061',location:'app-header-shell.tsx:AppHeaderShell',message:'header auth props',data:{isAuthenticated,userName,hasUserId:Boolean(user?.id)},timestamp:Date.now(),hypothesisId:'A,E'})}).catch(()=>{});
  // #endregion

  return (
    <AppHeader
      className={className}
      userName={userName}
      userInitials={user ? getUserInitials(user) : "G"}
      isAuthenticated={isAuthenticated}
      favoritesCount={favoritesCount}
    />
  );
}


