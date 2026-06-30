"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UnsavedChangesDialogProps } from "@/hooks/use-unsaved-changes";

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  onSave,
  onDiscard,
  saving,
}: UnsavedChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md" showClose={false}>
        <DialogHeader>
          <DialogTitle>Unsaved changes</DialogTitle>
          <DialogDescription>
            You have unsaved changes. Save them before leaving, or discard your changes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col items-stretch gap-2 sm:flex-col sm:items-stretch">
          <Button type="button" onClick={onSave} disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            Save changes
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Stay on page
            </Button>
            <Button type="button" variant="outline" onClick={onDiscard} disabled={saving}>
              Discard
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
