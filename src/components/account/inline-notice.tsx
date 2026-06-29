import type { ReactNode } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export interface InlineNoticeProps {
  variant?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function InlineNotice({
  variant = "info",
  title,
  children,
  actions,
  onDismiss,
  className,
}: InlineNoticeProps) {
  return (
    <Alert
      variant={variant}
      title={title}
      onDismiss={onDismiss}
      className={cn("rounded-xl", className)}
    >
      <div className="space-y-3">
        <AlertDescription>{children}</AlertDescription>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </Alert>
  );
}
