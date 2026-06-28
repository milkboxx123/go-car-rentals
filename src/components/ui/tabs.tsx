"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tabsListVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      underline:
        "h-auto w-full justify-start gap-6 border-b border-go-border bg-transparent p-0",
      pill: "h-11 gap-1 rounded-pill bg-go-muted-light p-1",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap text-body-sm font-semibold transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        underline:
          "rounded-none border-b-2 border-transparent px-1 pb-3 pt-1 text-go-muted hover:text-go-ink data-[state=active]:border-go-gold data-[state=active]:text-go-ink",
        pill: "rounded-pill px-4 py-2 text-go-muted hover:text-go-ink data-[state=active]:bg-go-paper data-[state=active]:text-go-ink data-[state=active]:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  listVariant?: VariantProps<typeof tabsListVariants>["variant"];
}

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
