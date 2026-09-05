# GAP Frontend

Next.js 14 (App Router) app powering GAP — a marketplace connecting real estate owners with
service providers via tenders/contracts. Landing page uses Tailwind CSS; dashboards use MUI
(Material-UI). State is managed with Redux Toolkit + redux-persist.

## Git workflow

- `developer` is the **protected** main branch — never commit directly to it.
- Before starting any task, create a new branch off `developer` with a descriptive, kebab-case name reflecting the work, e.g.:
  - `feat/<short-description>` — new functionality
  - `fix/<short-description>` — bug fixes
  - `refact/<short-description>` — refactors
  - `docs/<short-description>` — documentation-only changes
  - Include a ticket key when one exists (e.g. `fix/GP-985-twilio-guard`), matching the convention seen in recent commit history (`GP-985-be-update-twilio-endpoints-with-twilio-guard`).
- Commit and push work on that branch, then open a PR into `developer` — don't ask to merge/push straight to `developer`.


## Commands

- `npm run dev` — start dev server (turbo mode), http://localhost:3000
- `npm run build` — production build (no lint)
- `npm run build:ci` / `npm run start:ci` — CI build/start (uses next binary directly)
- `npm run lint` — ESLint over `src` (must pass in CI)
- `npm run format` — Prettier write
- `npm run prettier-check` — Prettier check (must pass in CI, runs before lint in CI)
- `npm run test` — not implemented yet in this repo

CI (`.github/workflows/build.yml`) runs, in order: prettier-check → lint → build:ci → test.
Match this order locally before pushing: `npm run prettier-check && npm run lint && npm run build:ci`.

## Path aliases (tsconfig.json)

- `@/*` → `src/*`
- `@/lib/*` → `src/lib/*`
- `@/utils/*` → `src/utils/*`
- `@icons/*`, `@images/*`, `@svgs/*`, `@public/*` → `public/{icons,images,svgs}` and `public/*`

Always import via these aliases rather than relative `../../..` chains across top-level folders.

## Directory structure

```
src/
├── app/            # Next.js App Router routes only — thin pages that render a screen
├── screens/        # Actual feature implementation, mirrors app/ route structure
├── components/     # Reusable UI components, organized by category (see below)
├── api/            # Axios API modules, one folder per domain (auth, building, contract, ...)
├── lib/            # Redux store, slices (lib/features/*Slice.ts), typed hooks
├── hooks/          # Shared custom React hooks
├── utils/          # Cross-cutting helpers (routes, enums, validation, logger, auth, S3 upload)
├── typings/        # Global/shared TypeScript types
└── styles/         # Global styles
```

`src/app` should stay thin: route/layout/metadata wiring that renders a component from
`src/screens`. Business logic and UI composition for a feature belongs in `src/screens`, not in
`app/**/page.tsx`.

### `components/` categories

`inputs/`, `layout/`, `data-display/`, `navigation/`, `feedback/`, `surfaces/`, `utils/`,
`common/` — place a new shared component in the category matching its purpose (e.g. a new form
control goes in `inputs/`, a new modal in `feedback/`).

### `api/`

One folder per backend domain (`auth`, `building`, `contract`, `email`, `facility`, `s3`,
`tender`, `user`), each exporting a default object of methods that call the shared `axios`
instance (`src/api/axios.ts`). The axios instance attaches the `access_token` cookie as a Bearer
token and clears it on a 403. Never call `axios`/`fetch` directly from a screen or component —
add or reuse a method on the relevant domain API object.

### `lib/` (Redux)

- `lib/store.ts` — store setup with redux-persist.
- `lib/hooks.ts` — typed `useAppSelector` / `useAppDispatch`; use these, not the raw
  `react-redux` hooks.
- `lib/features/<name>Slice.ts` — one slice per domain, each exporting selectors (e.g.
  `currentUser`, `getContract`) alongside the slice actions/thunks. Add new server state here
  rather than local component state when it needs to be shared or persisted.

## Naming conventions (README + observed codebase)

- **Folders:** lower-case, kebab-case for multi-word (e.g. `service-provider`, `real-estate`).
- **Component files:** PascalCase (e.g. `GButton.tsx`, `ContractApplicationForm.tsx`).
- **Utility/non-component files:** camelCase (e.g. `routes.ts`, `utils.ts`), except a few
  established PascalCase utils (`Logger.ts`, `Constants.ts`, `ValidationSchema.ts`) — match the
  existing file's convention in that folder, don't rename existing files to "fix" this.
  Note: `filenames/match-exported` ESLint rule enforces PascalCase filenames for exported symbols
  everywhere except `src/app/**`, `src/lib/**`, `src/api/**`.
- **Variables/functions:** camelCase.
- **Shared components:** prefix with `G` (e.g. `GButton`, `GInput`) to mark them as GAP-specific
  rather than a raw MUI/framework component.
- **Types/interfaces:** PascalCase; component prop interfaces suffixed with `Props`
  (e.g. `GButtonProps`). Colocate feature types in a `types.ts` next to the screen/feature that
  owns them (e.g. `screens/service-provider/application/types.ts`); put cross-feature shared
  types in `src/typings/types.ts`.
- **Component definition:** `const MyComponent: React.FC<MyComponentProps> = (...) => {}` or
  `const MyComponent = (): JSX.Element => {}` for non-prop components, default-exported at the
  end of the file (matches actual codebase — the README's named-export/barrel-file pattern is
  aspirational and not what's currently in the code; follow the neighboring file you're editing).
- **Inline styles:** build MUI `sx` values as a typed `SxProps` object (e.g. `buttonStyles`)
  declared in the component file and spread into `sx={{ ...buttonStyles, ...sx }}`, not written
  inline in JSX, so consumers can still override via a passed-in `sx` prop.
- **Icons:** MUI icons (`@mui/icons-material`) and `react-icons` only.
- **Styling source of truth:** landing page tokens live in `tailwind.config.ts`; dashboard theme
  lives in `src/app/theme.ts` — don't hardcode colors/fonts that already exist as theme/tailwind
  tokens.

## TypeScript & lint rules that matter here (.eslintrc.json)

- Explicit function return types are required (`@typescript-eslint/explicit-function-return-type`)
  except for expressions/typed function expressions/HOFs — annotate top-level exported functions.
- `any` is allowed (`no-explicit-any` is off) but prefer real types for new code; existing `any`
  usage in `api/**` is legacy, not a pattern to copy for new modules when a real type is easy.
- `eqeqeq: always` — always use `===`/`!==`.
- No nested ternaries (warn) — prefer an early return or a small helper.
- `complexity` max cyclomatic complexity of 5 (warn) — extract helpers past that.
- No unused vars, except args prefixed with `_`.
- No duplicate imports; no shadowed variables.
- `prefer-arrow-callback` — use arrow functions for callbacks.
- Use `logger` (`@/utils/Logger`, winston) instead of `console.log`/`console.error` in app code.
- Formatting is Prettier-owned (`.prettierrc`: 2-space, 80 print width, LF, ES5 trailing commas)
  — don't hand-format to disagree with it; run `npm run format`.

## Forms & validation

- Forms use **Formik**; validation schemas live in `src/utils/ValidationSchema.ts` (**yup**).
  Add new schemas there rather than inlining validation in a component.

## Environment

- Copy `.env.example` to `.env`. Required: `NEXT_PUBLIC_API_BASE_URL`,
  `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, `NEXT_PUBLIC_GOOGLE_MAPS_API_BASE_URL`.
- Never commit `.env` or real API keys.

## Deployment

Deployed as a Docker container on AWS EC2 (see `Dockerfile` / `docker-compose.yml`); see the
Confluence GAP space for the deployment runbook. Don't change `Dockerfile`,
`docker-compose.yml`, or `.github/workflows/build.yml` without calling it out explicitly, since
these affect CI/CD and shared infrastructure.
