import * as React from "react";
import NextLink from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-gold focus-visible:ring-offset-2";

export const linkVariants = cva(
  ["inline-flex items-center gap-1 transition-colors duration-fast", focusRing].join(
    " "
  ),
  {
    variants: {
      variant: {
        text: "text-go-ink hover:text-go-ink-soft",
        underline:
          "text-go-ink underline-offset-4 hover:underline",
        nav: "text-go-ink font-semibold hover:text-go-gold-dark",
        footer: "text-go-muted hover:text-go-ink text-body-sm",
        subtle: "text-go-muted hover:text-go-ink text-body-sm",
        card: "text-go-ink font-semibold hover:text-go-gold-dark after:absolute after:inset-0",
        /** Use inside Button asChild — no link colors; button variant controls text */
        button: "inline-flex items-center gap-2 no-underline hover:no-underline",
      },
    },
    defaultVariants: {
      variant: "text",
    },
  }
);

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, href, external, children, ...props }, ref) => {
    const classes = cn(linkVariants({ variant }), className);

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <NextLink ref={ref} href={href} className={classes} {...props}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

export { Link };
