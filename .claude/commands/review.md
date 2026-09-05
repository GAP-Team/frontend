---
description: Review changed code against GAP frontend conventions, clean code, and SOLID principles
---

Review the current diff (uncommitted changes if any exist, otherwise the last commit versus
`developer`) against this project's conventions. Read `.claude/CLAUDE.md` first if you have not
already loaded it this session — it documents the actual conventions of this codebase.

Do not review formatting/whitespace issues that `npm run prettier-check` and `npm run lint`
already catch mechanically — focus on things a linter can't see.

For each changed file, check the following, and only report real, concrete issues (not stylistic
nitpicks with no functional or maintainability impact):

## 1. Project conventions (`.claude/CLAUDE.md`)

- File placement: business logic/UI composition in `src/screens`, not in `src/app/**/page.tsx`;
  API calls only through `src/api/<domain>` modules using the shared axios instance, never
  ad-hoc `axios`/`fetch` calls in a screen or component.
- Naming: PascalCase component files, `G`-prefixed shared components, `*Props` suffix on prop
  interfaces, kebab-case multi-word folders.
- Imports use the `@/*`, `@/lib/*`, `@/utils/*`, `@icons/*`, `@images/*`, `@svgs/*`, `@public/*`
  aliases instead of deep relative paths across top-level folders.
- New shared/reusable components land in the right `components/` category (`inputs`, `layout`,
  `data-display`, `navigation`, `feedback`, `surfaces`, `common`, `utils`).
- Redux: shared/persisted state added to a slice in `lib/features`, read via `useAppSelector`/
  `useAppDispatch` from `lib/hooks`, not raw `react-redux` hooks or ungoverned local state for
  data that should be shared.
- Forms use Formik with yup schemas in `src/utils/ValidationSchema.ts`, not hand-rolled
  validation.
- MUI `sx` styling extracted into a typed `SxProps` object in the file rather than large inline
  objects in JSX.
- `logger` (`@/utils/Logger`) used instead of `console.log`/`console.error`.
- No secrets, API keys, or `.env` values committed.

## 2. TypeScript / lint rules with real functional impact

- Explicit return types on exported functions.
- `===`/`!==` only.
- No unused variables/imports, no duplicate imports, no shadowed variables.
- Cyclomatic complexity kept reasonable (ESLint warns above 5) — flag functions that clearly
  need to be split, not borderline cases.
- New `any` usage in _new_ code where a concrete type is one step away (don't flag pre-existing
  `any` in unrelated code you didn't touch).

## 3. Clean code

- Functions/components do one thing; names say what they do without needing a comment.
- No dead code, no commented-out code, no leftover debug statements.
- No duplicated logic that should be a shared helper/hook — but don't invent an abstraction for
  code used exactly once.
- Error handling only where errors can actually occur (network calls, parsing, user input) — not
  defensive checks for impossible states.
- Comments only where they explain a non-obvious _why_ (a workaround, a constraint from the
  backend, a tricky invariant) — flag comments that just restate the code.

## 4. SOLID (applied pragmatically to React/TS, not academically)

- **SRP** — a component/hook/module has one reason to change (e.g. a component isn't both
  fetching data, transforming it, and rendering three unrelated concerns — split into a
  container/hook + presentational component when it's doing clearly unrelated jobs).
- **OCP** — new variants (e.g. a new button style, a new tender status) can be added via props/
  config rather than branching deep inside existing logic with new `if`/`switch` cases sprinkled
  across the file.
- **LSP** — a component that extends/wraps another (e.g. `GButton` wrapping MUI `Button`) doesn't
  narrow or break the base props' contract for consumers.
- **ISP** — prop interfaces aren't bloated with fields only one caller needs; prefer composing
  smaller prop types over one large do-everything props object.
- **DIP** — screens/components depend on the `api/<domain>` and `lib/features` abstractions, not
  directly on axios, fetch, or storage details; business logic doesn't reach into UI-only state.

## Output

Report findings ranked by severity (bugs/correctness first, then convention violations, then
clean-code/SOLID). For each: file:line, what's wrong, why it matters here, and a concrete fix.
If nothing meaningful is wrong, say so plainly instead of inventing nitpicks.
