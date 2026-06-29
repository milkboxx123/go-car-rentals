import { cn } from "@/lib/utils";

export interface MessageBubbleProps {
  body: string;
  createdAt: string;
  fromAdmin: boolean;
  className?: string;
}

export function MessageBubble({
  body,
  createdAt,
  fromAdmin,
  className,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-body-sm",
        fromAdmin
          ? "border border-go-border bg-go-cream text-go-ink"
          : "ml-auto bg-go-gold text-go-ink",
        className
      )}
    >
      <p>{body}</p>
      <p className="mt-1 text-caption opacity-70">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
}

export function SystemMessageBubble({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-go-border bg-go-muted-light px-4 py-3 text-body-sm text-go-muted",
        className
      )}
    >
      The Go team usually replies as soon as possible during business hours. For
      urgent rental issues, use the support contact shown in your trip details.
    </div>
  );
}
