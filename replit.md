# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Elite Synthetic Lawn Solutions Website (`artifacts/esls-website`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview Path**: `/`
- **Firebase Project**: `esls-23c31`
- **Features**:
  - Luxury landing page with hero, services, gallery, reviews, estimator, contact
  - Instant cost estimator with lead capture (saves to Firestore `estimates` collection)
  - Photo-based area measurement tool using HTML Canvas
  - Reviews carousel with 12 five-star reviews
  - Photo gallery with lightbox (13 real project photos)
  - Contact/inquiry form (saves to Firestore `inquiries` collection)
  - Firebase Auth, Firestore integration
  - Dark luxury design (black/green/white palette)
  - Framer Motion animations throughout
  - Mobile responsive with sticky CTA bar

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
