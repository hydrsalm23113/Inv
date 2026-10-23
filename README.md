# INVITO — Digital Invitations

INVITO is a Next.js starter project for an Arabic-first digital invitation business. It includes a responsive landing page, template gallery, live editor preview, local demo publishing, invitation preview, RSVP demo, customer dashboard, admin dashboard, health endpoint, Supabase schema, and payment integration placeholders.

## Important: demo vs production

This package is a working **front-end/demo scaffold**, not a production payment platform yet.

- Demo invitations and RSVP responses are saved in the current browser's `localStorage`.
- Demo data is not shared between customers or devices.
- The admin page is not authenticated in this starter. Do not treat it as a secure production admin.
- Payment routes intentionally return `501` until a provider merchant account is approved and its API/webhook signature verification is implemented.
- Supabase schema and RLS starter policies are supplied, but the UI has not yet been migrated from local demo storage to database-backed authenticated operations.
- Sample prices, template artwork, copy, and metadata are placeholders; customize them before launch.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production build check:

```bash
npm run build
```

## Deploy to Vercel

1. Create a GitHub repository named `invito`.
2. Upload these project files to the repository root.
3. In Vercel, choose **Add New → Project**, import the `invito` repository.
4. Framework preset: Next.js. Build command: `npm run build`. Output directory: leave default.
5. Deploy. No environment variables are required for the demo UI.
6. Add your custom domain from Vercel Project Settings → Domains.
7. Do not use the demo admin/payment flows for real customers until the production checklist below is complete.

## Optional Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Add the following in Vercel Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy after adding environment variables.
5. Implement Supabase Auth, database reads/writes, public invitation fetching, and server-side admin role checks. Apply and test all RLS policies before using customer data.

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_` and never import it into client components.

## Payments

Before enabling real payments:
1. Obtain written approval from a payment provider for your Iraqi merchant/business status and settlement method.
2. Implement `app/api/payment/create/route.ts` using that provider's official current API.
3. Implement `app/api/payment/webhook/route.ts` to verify provider signatures and confirm the transaction server-to-server.
4. Add idempotency, amount/currency checks, replay protection, audit logs, refunds and failure handling.
5. Only mark an order paid after server verification.
6. Test in sandbox and obtain provider approval before production.
7. Never store card numbers or CVV in INVITO.

## Production launch checklist

- [ ] Add authentication and protected admin routes.
- [ ] Move all invitation, order and RSVP storage from localStorage to Supabase.
- [ ] Add strict RLS policies and server-side validation.
- [ ] Implement payment provider API and verified webhook.
- [ ] Add rate limiting, spam prevention and RSVP abuse controls.
- [ ] Add email/WhatsApp notification provider if needed.
- [ ] Add privacy policy, terms, refund policy and support contact.
- [ ] Review Iraqi business/tax/e-commerce obligations.
- [ ] Test mobile layout, RTL, accessibility and performance.
- [ ] Add backups, monitoring and error logging.
- [ ] Replace sample invitation art with original/licensed assets.

## Project structure

```text
app/
  api/health/route.ts
  api/payment/create/route.ts
  api/payment/webhook/route.ts
  admin/page.tsx
  dashboard/page.tsx
  editor/page.tsx
  i/[slug]/page.tsx
  templates/page.tsx
  globals.css
  layout.tsx
  page.tsx
components/
  site-shell.tsx
  template-card.tsx
lib/
  supabase.ts
  templates.ts
supabase/
  schema.sql
```

## Brand

Project name: INVITO  
Default locale: Arabic (RTL)  
Currency shown: IQD  
Design direction: minimalist, elegant, cream, champagne-gold, charcoal.
