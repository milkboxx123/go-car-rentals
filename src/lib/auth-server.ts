import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, verifyJwt, type AuthUser } from "@/lib/auth-jwt";

export async function getTokenFromCookies() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getTokenFromCookies();
  // #region agent log
  fetch('http://127.0.0.1:7895/ingest/618db32d-237f-48fb-b96d-671b9ead087e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'08b061'},body:JSON.stringify({sessionId:'08b061',location:'auth-server.ts:getCurrentUser',message:'auth cookie check',data:{hasToken:Boolean(token)},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  if (!token) return null;
  const user = await verifyJwt(token);
  // #region agent log
  fetch('http://127.0.0.1:7895/ingest/618db32d-237f-48fb-b96d-671b9ead087e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'08b061'},body:JSON.stringify({sessionId:'08b061',location:'auth-server.ts:getCurrentUser',message:'jwt verify result',data:{hasUser:Boolean(user),displayName:user?`${user.firstName} ${user.lastName}`:null},timestamp:Date.now(),hypothesisId:'B,C'})}).catch(()=>{});
  // #endregion
  return user;
}
