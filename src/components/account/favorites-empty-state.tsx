import { Heart } from "lucide-react";

import { AccountEmptyState } from "@/components/account/account-empty-state";
import { AccountSectionCard } from "@/components/account/account-section-card";

export function FavoritesEmptyState() {
  return (
    <AccountSectionCard contentClassName="p-0">
      <AccountEmptyState
        icon={<Heart className="size-6" aria-hidden="true" />}
        title="No favorites yet"
        description="Save vehicles you love by tapping the heart on any listing. Your favorites will appear here for quick access."
        primaryAction={{ label: "Browse vehicles", href: "/search" }}
        secondaryAction={{
          label: "How rentals work",
          href: "/how-it-works",
        }}
      />
    </AccountSectionCard>
  );
}
