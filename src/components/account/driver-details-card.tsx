"use client";

import { IdCard } from "lucide-react";

import { AccountSectionCard } from "@/components/account/account-section-card";
import { StatusBadge } from "@/components/account/status-badge";
import { Button } from "@/components/ui/button";

export function DriverDetailsCard() {
  return (
    <AccountSectionCard
      title="Driver details"
      description="Add driver information before checkout to help speed up your first rental."
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-go-muted-light text-go-muted">
              <IdCard className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-body-sm font-medium text-go-ink">
                Driver&apos;s license
              </p>
              <p className="text-body-sm text-go-muted">Not added yet</p>
            </div>
          </div>
          <p className="text-body-sm text-go-muted">
            Driver verification helps speed up checkout and may be required
            before your first rental.
          </p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="needs-action" label="Verification required" />
          </div>
        </div>
        <Button type="button" variant="outline" className="shrink-0">
          Add driver details
        </Button>
      </div>
    </AccountSectionCard>
  );
}
