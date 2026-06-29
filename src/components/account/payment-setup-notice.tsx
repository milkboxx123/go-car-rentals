import type { ReactNode } from "react";

import { InlineNotice } from "@/components/account/inline-notice";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

export interface PaymentSetupNoticeProps {
  onRetry?: () => void;
}

export function PaymentSetupNotice({ onRetry }: PaymentSetupNoticeProps) {
  const actions: ReactNode = (
    <>
      {onRetry ? (
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
      <Button asChild variant="ghost" size="sm">
        <Link href="/account/messages" variant="button">
          Contact support
        </Link>
      </Button>
    </>
  );

  return (
    <InlineNotice
      variant="warning"
      title="Payment setup is not available right now"
      actions={actions}
    >
      Saved cards could not be loaded. You can still review this page, but adding
      a new card may not work until payment setup is restored.
    </InlineNotice>
  );
}
