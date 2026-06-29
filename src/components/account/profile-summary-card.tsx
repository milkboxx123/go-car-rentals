"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/account/status-badge";
import { cn } from "@/lib/utils";

export interface ProfileSummaryCardProps {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  initials: string;
  className?: string;
}

export function ProfileSummaryCard({
  firstName,
  lastName,
  email,
  emailVerified,
  initials,
  className,
}: ProfileSummaryCardProps) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Guest";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-go-border bg-go-paper p-5 shadow-card sm:flex-row sm:items-center sm:justify-between md:p-6",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="text-body-md font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-heading-sm font-bold text-go-ink">{fullName}</h2>
          <p className="text-body-sm text-go-muted">{email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {emailVerified ? (
              <StatusBadge status="verified" />
            ) : (
              <Badge variant="warning">Email not verified</Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
