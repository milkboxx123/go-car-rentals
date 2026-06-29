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

  return (
    <MarketingHeader
      {...props}
      userName={user ? getUserDisplayName(user) : "Guest"}
      userInitials={user ? getUserInitials(user) : "G"}
      isAuthenticated={Boolean(user)}
    />
  );
}
