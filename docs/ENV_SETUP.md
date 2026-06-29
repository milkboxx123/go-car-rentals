# Environment Setup — Go Car Rentals

## Overview

| Environment | Database | Config source |
|---|---|---|
| Local dev | Docker Postgres (`localhost:5432`) | `.env.local` |
| Vercel Preview / Production | Neon Postgres | Vercel dashboard |

Neon is already connected via the Vercel Marketplace. `DATABASE_URL` is auto-provisioned in Vercel.

## Local development

### 1. Start Docker Postgres

```bash
npm run docker:up
```

### 2. Configure `.env.local`

Copy from `.env.example` and fill in values. For local DB:

```bash
DATABASE_URL="postgresql://gorentals:gorentals@localhost:5433/gorentals"
JWT_SECRET="local-dev-jwt-secret-change-in-production"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Generate a production JWT secret with:

```bash
openssl rand -base64 32
```

### 3. Apply database schema

```bash
npm run db:push
```

## Schema changes

After editing `prisma/schema.prisma`, apply the schema to **both** databases:

**Local (Docker):**

```bash
npm run docker:up
npm run db:push
```

**Neon (preview / production):**

```bash
vercel env pull .env.vercel
npm run db:push:neon
```

Run these before deploying app code that depends on new tables. Vercel builds run `prisma generate` but do not auto-migrate the database.

### 4. Run the app

```bash
npm run dev
```

### Reset local database

```bash
npm run docker:reset
npm run db:push
```

## Pull secrets from Vercel

To sync non-database secrets without overwriting your Docker `DATABASE_URL`:

```bash
vercel env pull .env.vercel
```

Copy `JWT_SECRET`, `POSTMARK_*`, and `STRIPE_*` from `.env.vercel` into `.env.local`. Keep `DATABASE_URL` pointed at Docker for local dev.

## Vercel environment variables

Already configured:

- `DATABASE_URL` — Neon (via Marketplace integration)

Add or verify these in **Project Settings → Environment Variables**:

| Variable | Environments |
|---|---|
| `JWT_SECRET` | Production, Preview, Development |
| `POSTMARK_API_KEY` | Production, Preview |
| `POSTMARK_FROM_EMAIL` | Production, Preview |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Production, Preview |
| `STRIPE_SECRET_KEY` | Production, Preview |
| `STRIPE_WEBHOOK_SECRET` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Production, Preview |

## Postmark

1. Create a Server at [postmarkapp.com](https://postmarkapp.com)
2. Copy the **Server API Token** → `POSTMARK_API_KEY`
3. Verify your sender domain (e.g. `gorentals.com`)
4. Set `POSTMARK_FROM_EMAIL` to a verified sender address

## Stripe

### Test keys (local / preview)

Use `pk_test_...` and `sk_test_...` from the Stripe Dashboard.

### Webhook — local

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the printed `whsec_...` into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

### Webhook — production

Stripe Dashboard → Developers → Webhooks → Add endpoint:

```
https://gorentals.com/api/stripe/webhook
```

Copy the signing secret into Vercel as `STRIPE_WEBHOOK_SECRET`.

## Security notes

- Never commit `.env` or `.env.local` (both are gitignored)
- Use test Stripe keys locally; live keys only in production
- Rotate `JWT_SECRET` if it is ever exposed
