import { cookies } from "next/headers";

import { jsonOk } from "@/lib/api-utils";
import { clearAuthCookieOptions } from "@/lib/auth";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(clearAuthCookieOptions());
  return jsonOk({ success: true });
}
