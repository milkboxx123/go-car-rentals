import { AccountSectionCard } from "@/components/account/account-section-card";
import { Button } from "@/components/ui/button";

export function AccountSecurityCard() {
  return (
    <AccountSectionCard
      title="Account security"
      description="Manage how you sign in and protect your account."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-body-sm font-medium text-go-ink">Password</p>
          <p className="text-body-sm text-go-muted">
            Change your password to keep your account secure.
          </p>
        </div>
        <Button type="button" variant="outline" disabled>
          Change password
        </Button>
      </div>
    </AccountSectionCard>
  );
}
