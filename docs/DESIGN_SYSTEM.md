# Go Design System — Contributor Guide

`/design-system` is the **single canonical reference** for tokens, components, and UI patterns in this project. There is no Storybook — all design documentation lives in the app.

## Local URL

```
http://localhost:3000/design-system
```

This route is internal only (`noindex`, disallowed in `robots.txt`). Do not link it from the public marketing footer or sitemap.

## When building any UI

1. Open `/design-system` and search the sidebar for an existing component.
2. Reuse primitives from `src/components/ui/` and composed components from `go/`, `marketing/`, `booking/`, `admin/`, or `layout/`.
3. Use design tokens — never hardcode brand colors in components.

## Layering rules

| Layer | Path | Purpose |
|-------|------|---------|
| Tokens | `src/design-system/tokens/` | Colors, typography, spacing, radius, shadows, motion |
| CSS variables | `src/app/globals.css` | Runtime theme values mapped to Tailwind |
| Primitives | `src/components/ui/` | Generic Radix-backed building blocks |
| Brand | `src/components/go/` | Logo, lockups, price display, composed forms |
| Marketing | `src/components/marketing/` | Homepage and location page sections |
| Booking | `src/components/booking/` | Vehicle cards, booking flow, checkout UI |
| Admin | `src/components/admin/` | Dashboard tables, metrics, forms |
| Layout | `src/components/layout/` | Headers, footer, shells, navigation |

## Adding or updating a component

1. **Implement** the component using tokens and existing patterns.
2. **Register** it in `src/components/design-system/component-registry.ts` (sidebar nav + anchor ID).
3. **Document** it with a `DsSection` in the appropriate file under `src/components/design-system/sections/`.
4. **Wire** new section files into `src/app/design-system/page.tsx` if needed.
5. **Preview** with realistic copy and mock data from `src/mock/`.

Each `DsSection` should include:

- Title and one-line usage description
- Import path (`import { X } from "@/components/..."`)
- Live preview(s) via `DsPreview`
- Variant grids and state rows where applicable
- `DsNote` for non-obvious patterns (accessibility, composition rules)

## Documented patterns

### Button + Link (`asChild`)

When rendering a link that looks like a button, use `Link variant="button"` inside `Button asChild` so link text colors do not override button variants:

```tsx
<Button asChild variant="primary">
  <Link href="/search" variant="button">
    Book a car
  </Link>
</Button>
```

Marketing headers use `primary` (gold) for the main CTA.

### Tokens over hardcoded values

Use Tailwind classes backed by tokens: `bg-go-gold`, `text-go-ink`, `border-go-border`, etc. — not raw hex in components.

## Mock data

Centralized fixtures live in `src/mock/`. Use these for design-system previews and example pages.

## Running the gallery

```bash
npm run dev
# open http://localhost:3000/design-system
```
