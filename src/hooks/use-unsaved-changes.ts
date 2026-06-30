"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type NavigationAction =
  | { type: "back" }
  | { type: "href"; href: string }
  | { type: "callback"; run: () => void };

export interface UnsavedChangesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: () => void | Promise<void>;
  onDiscard: () => void;
  saving: boolean;
}

export function useUnsavedChanges({
  isDirty,
  onSave,
}: {
  isDirty: boolean;
  onSave: () => Promise<boolean>;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const pendingRef = useRef<NavigationAction | null>(null);
  const bypassRef = useRef(false);
  const historyPushedRef = useRef(false);

  const executePending = useCallback(() => {
    const action = pendingRef.current;
    pendingRef.current = null;

    if (!action) return;

    bypassRef.current = true;

    if (action.type === "back") {
      router.back();
      return;
    }

    if (action.type === "callback") {
      action.run();
      return;
    }

    if (action.href.startsWith("http")) {
      window.location.href = action.href;
      return;
    }

    router.push(action.href);
  }, [router]);

  const queueNavigation = useCallback((action: NavigationAction) => {
    pendingRef.current = action;
    setOpen(true);
  }, []);

  const requestNavigation = useCallback(
    (action: NavigationAction) => {
      if (!isDirty || bypassRef.current) {
        bypassRef.current = true;
        pendingRef.current = action;
        executePending();
        return;
      }

      queueNavigation(action);
    },
    [executePending, isDirty, queueNavigation]
  );

  const requestBack = useCallback(() => {
    requestNavigation({ type: "back" });
  }, [requestNavigation]);

  const requestHref = useCallback(
    (href: string) => {
      requestNavigation({ type: "href", href });
    },
    [requestNavigation]
  );

  const requestAction = useCallback(
    (run: () => void) => {
      requestNavigation({ type: "callback", run });
    },
    [requestNavigation]
  );

  useEffect(() => {
    if (!isDirty) {
      historyPushedRef.current = false;
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;

    const handleClick = (event: MouseEvent) => {
      if (bypassRef.current || event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash === window.location.hash
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      queueNavigation({ type: "href", href: url.pathname + url.search + url.hash });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isDirty, queueNavigation]);

  useEffect(() => {
    if (!isDirty) return;

    if (!historyPushedRef.current) {
      window.history.pushState(null, "", window.location.href);
      historyPushedRef.current = true;
    }

    const handlePopState = () => {
      if (bypassRef.current) return;
      window.history.pushState(null, "", window.location.href);
      queueNavigation({ type: "back" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDirty, queueNavigation]);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      pendingRef.current = null;
    }
    setOpen(nextOpen);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const success = await onSave();
      if (!success) return;

      bypassRef.current = true;
      setOpen(false);
      executePending();
    } finally {
      setSaving(false);
    }
  }, [executePending, onSave]);

  const handleDiscard = useCallback(() => {
    bypassRef.current = true;
    setOpen(false);
    executePending();
  }, [executePending]);

  const dialogProps: UnsavedChangesDialogProps = {
    open,
    onOpenChange: handleOpenChange,
    onSave: handleSave,
    onDiscard: handleDiscard,
    saving,
  };

  return {
    requestBack,
    requestHref,
    requestAction,
    dialogProps,
  };
}
