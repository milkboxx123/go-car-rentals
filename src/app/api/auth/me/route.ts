import { jsonError, jsonOk } from "@/lib/api-utils";
import { getCurrentUser } from "@/lib/auth-server";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return jsonError("Unauthorized", 401);
  }
  return jsonOk({ user });
}
