"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-go-paper group-[.toaster]:text-go-ink group-[.toaster]:border-go-border group-[.toaster]:shadow-popover group-[.toaster]:rounded-lg",
          description: "group-[.toast]:text-go-muted",
          actionButton:
            "group-[.toast]:bg-go-gold group-[.toast]:text-go-ink group-[.toast]:font-semibold",
          cancelButton:
            "group-[.toast]:bg-go-muted-light group-[.toast]:text-go-ink",
          success: "group-[.toast]:border-go-success/30",
          error: "group-[.toast]:border-go-danger/30",
          warning: "group-[.toast]:border-go-warning/30",
          info: "group-[.toast]:border-go-info/30",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
