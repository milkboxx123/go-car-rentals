# Go Car Rentals — Design System

Premium car-rental design system and component library for **Go** and location-based sub-brands (Go Tampa, Go Boston, Go Miami, etc.).

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui patterns (customized)
- class-variance-authority, lucide-react, Framer Motion, Zod, date-fns

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
```

## Design system (canonical UI reference)

All tokens, components, and patterns are documented at:

**http://localhost:3000/design-system**

See [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for contributor workflow when adding or updating components.

## Routes to review

| Route | Description |
|-------|-------------|
| `/design-system` | **Canonical** token gallery and component inventory (internal, noindex) |
| `/` | Marketing homepage |
| `/locations/tampa` | Go Tampa location landing |
| `/search` | Search results with filters |
| `/vehicles/veh-rav4-2024` | Vehicle detail example |
| `/checkout` | Checkout flow mock |
| `/account/trips` | Guest trips page |
| `/admin` | Admin dashboard |
| `/admin/fleet` | Fleet management |

## Project structure

```
src/
  design-system/tokens/   # Color, typography, spacing, radius, shadow, motion tokens
  components/ui/          # Generic UI primitives
  components/go/          # Brand components and composed forms
  components/marketing/   # Marketing sections
  components/booking/     # Booking and vehicle components
  components/admin/       # Admin dashboard components
  components/layout/      # Headers, footer, shells
  components/design-system/  # /design-system page sections and shell
  mock/                   # Realistic mock data
  types/                  # TypeScript interfaces
  app/                    # Example pages
docs/
  DESIGN_SYSTEM.md        # Contributor guide
```

## Brand tokens

- **Ink** `#231f20` — primary text, dark surfaces
- **Gold** `#f9d96a` — primary CTA, focus, highlights
- **Cream** `#fbf7ef` — marketing backgrounds

## Phase scope

This is **phase 1**: design system foundations, reusable components, documentation, and example pages. No backend, payments, or real booking logic yet.
