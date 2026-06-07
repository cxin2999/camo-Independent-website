# Camo Independent Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first runnable Next.js version of the camouflage hook and loop fabric B2B website from the technical plan and Stitch prototypes.

**Architecture:** Use Next.js App Router with static-first pages, TypeScript content files, reusable layout/UI components, and a small route handler for inquiry validation. Visual styling follows the Stitch Industrial Tactical System: charcoal, olive, warm white, light grey, sharp material imagery, low-shadow bordered surfaces, and responsive desktop/mobile CTA patterns.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS v4, Zod, Phosphor SSR icons, local generated PNG placeholders.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`

- [ ] Add the Next.js configuration and base app shell.
- [ ] Define global theme tokens matching Stitch.
- [ ] Verify `npm install` succeeds.

### Task 2: Visual Assets

**Files:**
- Create: `scripts/generate-assets.mjs`
- Generate: `public/images/**/*.png`

- [ ] Generate local material, product, application, and factory image placeholders.
- [ ] Use images as real visual surfaces in hero, cards, and page headers.

### Task 3: Content And Components

**Files:**
- Create: `src/content/*.ts`
- Create: `src/components/layout/*.tsx`
- Create: `src/components/ui/*.tsx`
- Create: `src/components/forms/*.tsx`

- [ ] Add product, application, pattern, factory, FAQ, and site content.
- [ ] Add Header, Footer, Sticky Inquiry Bar, buttons, containers, sections, material cards, and inquiry forms.

### Task 4: Pages

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/products/page.tsx`
- Create: `src/app/products/[slug]/page.tsx`
- Create: `src/app/applications/page.tsx`
- Create: `src/app/customization/page.tsx`
- Create: `src/app/factory/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/contact/page.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] Build pages following the Stitch page order and responsive structure.
- [ ] Add page metadata for core SEO targets.

### Task 5: Inquiry API And Verification

**Files:**
- Create: `src/lib/inquiry/schema.ts`
- Create: `src/lib/inquiry/send-email.ts`
- Create: `src/app/api/inquiry/route.ts`
- Create: `.env.example`

- [ ] Validate requests with Zod, honeypot, and submit-time checks.
- [ ] Return success in development without requiring real email credentials.
- [ ] Run `npm run lint` and `npm run build`.
