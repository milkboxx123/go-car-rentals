import {
  MarketingHeader,
  type MarketingHeaderProps,
} from "@/components/layout/marketing-header";
import {
  getUserDisplayName,
  getUserInitials,
} from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth-server";

export async function MarketingHeaderShell(
  props: Omit<
    MarketingHeaderProps,
    "userName" | "userInitials" | "isAuthenticated"
  >
) {
  const user = await getCurrentUser();
  const isAuthenticated = Boolean(user);
  // #region agent log
  fetch('http://127.0.0.1:7895/ingest/618db32d-237f-48fb-b96d-671b9ead087e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'08b061'},body:JSON.stringify({sessionId:'08b061',location:'marketing-header-shell.tsx:MarketingHeaderShell',message:'marketing header auth props',data:{isAuthenticated,userName:user?getUserDisplayName(user):'Guest'},timestamp:Date.now(),hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return (
    <MarketingHeader
      {...props}
      userName={user ? getUserDisplayName(user) : "Guest"}
      userInitials={user ? getUserInitials(user) : "G"}
      isAuthenticated={Boolean(user)}
    />
  );
}
