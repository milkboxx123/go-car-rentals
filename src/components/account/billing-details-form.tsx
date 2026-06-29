"use client";

import { AccountFormGrid } from "@/components/account/account-form-grid";
import { TextInput } from "@/components/go/forms";
import { Button } from "@/components/ui/button";

export function BillingDetailsForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <AccountFormGrid columns={1}>
        <TextInput label="Name on card" placeholder="Full name" disabled />
      </AccountFormGrid>
      <TextInput label="Billing address" placeholder="Street address" disabled />
      <AccountFormGrid>
        <TextInput label="City" placeholder="City" disabled />
        <TextInput label="State" placeholder="State" disabled />
      </AccountFormGrid>
      <AccountFormGrid>
        <TextInput label="ZIP" placeholder="ZIP code" disabled />
        <TextInput label="Country" placeholder="Country" disabled />
      </AccountFormGrid>
      <p className="text-body-sm text-go-muted">
        Billing details can be saved during checkout. This section will be
        available soon.
      </p>
      <Button type="button" variant="outline" disabled>
        Save billing details
      </Button>
    </form>
  );
}
