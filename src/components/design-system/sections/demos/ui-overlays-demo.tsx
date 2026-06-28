"use client";

import { toast } from "sonner";
import { Calendar, Car, MapPin, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel reservation?</DialogTitle>
          <DialogDescription>
            Your Tampa pickup on Jun 30 will be released. Free cancellation
            applies until 24 hours before pickup.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Keep reservation</Button>
          <Button variant="destructive">Cancel trip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Trip filters</SheetTitle>
          <SheetDescription>
            Refine results for Tampa airport rentals.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 p-6 pt-0">
          <p className="text-body-sm text-go-muted">Vehicle class, price, and pickup method.</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <p className="text-label text-go-ink">Pickup window</p>
          <p className="text-body-sm text-go-muted">
            Curbside pickup at TPA is available 6am–11pm. Your host will send
            exact meeting point details 2 hours before pickup.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <MoreHorizontal className="size-4" />
          Trip actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Reservation GO-TPA-8F2K9M</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Calendar className="size-4" />
          Modify dates
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MapPin className="size-4" />
          Change pickup location
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Car className="size-4" />
          Swap vehicle
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-go-danger">Cancel trip</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Security deposit</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>$200 hold released 48 hours after return</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ToastDemo() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            toast.success("Reservation confirmed", {
              description: "Pickup at TPA Terminal B on Jun 30, 10:00 AM.",
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.error("Payment failed", {
              description: "Update your card to complete checkout.",
            })
          }
        >
          Error toast
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast.info("Trip reminder", {
              description: "Your rental starts in 24 hours.",
            })
          }
        >
          Info toast
        </Button>
      </div>
    </>
  );
}

export function UiOverlaysDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <DialogDemo />
      <SheetDemo />
      <PopoverDemo />
      <DropdownMenuDemo />
      <TooltipDemo />
      <ToastDemo />
    </div>
  );
}
