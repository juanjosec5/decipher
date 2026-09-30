# plan.md — DeCipher: Daily Cryptography Puzzle

A Wordle-style daily game: one cipher puzzle per day, same for everyone, solved as fast
as possible. Working title/package name: **decipher**.

---

## 1. Tech stack (decided — do not substitute)

- **Vue 3** with `<script setup>` and the Composition API only. No Options API.
- **TypeScript**, strict mode on.
- **Vite** as the build tool.
- **Pinia** for state (current puzzle + stats), setup-store syntax.
- **Tailwind CSS v4** (via `@tailwindcss/vite`) for styling. Mobile-first, very minimal —
  this is not a visually busy game. No UI component library.
- **Vitest** for unit tests of the cipher engine (pure functions only, no component tests
  needed for v1).
- **localStorage** for stats/streak persistence. No backend, no auth, no server.
- **ESLint + Prettier**, TypeScript-aware config.
- No Vue Router — the app is a single screen with a lightweight view toggle (Play ↔
  Stats), not a multi-route app. Keep it simple.

## 2. Architecture — engine / store / UI

```
UI (Vue)      → renders the puzzle, takes the player's guess
Store (Pinia) → holds today's puzzle + guess/timer state + stats, persists to localStorage
Engine (pure TS) → knows how to encode/decode each cipher type and pick "today's" puzzle
```

The engine (`src/engine/`) has **zero Vue imports** and is fully unit-testable.

### Directory structure

```
src/
├── main.ts, App.vue, style.css
├── types/index.ts          — CipherType, Difficulty, Puzzle
├── data/puzzles.ts          — static, hand-authored list of puzzles
├── engine/
│   ├── ciphers/
│   │   ├── caesar.ts        — shift cipher
│   │   ├── morse.ts         — morse code
│   │   ├── substitution.ts  — monoalphabetic substitution
│   │   └── numericSymbol.ts — Atbash + A1Z26 + simple symbol variants
│   └── puzzleSelector.ts    — epoch date math → today's Puzzle + puzzle number
├── stores/
│   ├── puzzle.ts             — current puzzle, guess text, timer, solved state
│   └── stats.ts              — streak/history, persisted to localStorage
├── components/
│   ├── CipherLegend.vue      — "how this cipher works" example, shown above the puzzle
│   ├── DifficultyBadge.vue
│   ├── CipherText.vue        — the ciphertext to solve
│   ├── GuessInput.vue
│   └── ResultShare.vue       — minimal share text: puzzle #, cipher type, time
└── views/
    ├── PlayView.vue
    └── StatsView.vue
```

### Cipher module contract

Each module in `engine/ciphers/` exports:
- `encode(plaintext: string): { ciphertext: string; key: string }` — deterministic; the
  `key` is whatever a solver would need to reverse it (shift amount, substitution map,
  etc). Randomness in key generation (e.g. picking a substitution map) must be seeded
  from the puzzle id, **not** `Math.random()`, so the same puzzle is identical for every
  player on a given day.
- `getExample(): { from: string; to: string }[]` — a 2-3 pair sample used by
  `CipherLegend.vue` to show how the cipher works (e.g. Caesar: `A→D, B→E`).

Puzzles are authored in `data/puzzles.ts` as `{ id, cipherType, difficulty, plaintext }`
only — the ciphertext/key is always derived at runtime via `encode()`. Plaintext is
always a full phrase/sentence, never a single word.

### Puzzle selection

- Fixed `LAUNCH_DATE` epoch constant in `puzzleSelector.ts`.
- `puzzleNumber = daysSince(LAUNCH_DATE) + 1`.
- `puzzleIndex = daysSince(LAUNCH_DATE) % puzzles.length` (cycles once the list is
  exhausted — fine for v1, extend the list over time).
- Date math uses the viewer's local calendar day so the puzzle changes at local
  midnight, like Wordle.

## 3. UI behavior

- **Play screen**: `CipherLegend` (how today's cipher works) at the top, `DifficultyBadge`
  next to the puzzle number, `CipherText` (the ciphertext), then `GuessInput`. On correct
  guess: stop the timer, mark solved, show `ResultShare`.
- **Share text** is deliberately minimal: puzzle number, cipher type, completion time.
  Nothing else (no emoji grid, no image).
- **Stats screen**: current streak, longest streak, puzzles solved — read from
  `stores/stats.ts`.
- Design must be mobile-first and minimal: no dense chrome, generous tap targets, legible
  monospace for ciphertext. Consult the `frontend-design` skill for aesthetic direction
  before finalizing colors/type — don't ship default-template styling.

## 4. Build phases

Ship phase by phase; each phase should leave the app in a working state.

1. **Scaffold** — Vite+Vue+TS+Tailwind+Pinia, lint/format config, `vercel.json`. ✅ done.
2. **Cipher engine** — `engine/ciphers/*` + `engine/puzzleSelector.ts`, with Vitest
   coverage for each cipher's encode/decode round-trip and `getExample()`.
3. **Puzzle data** — `data/puzzles.ts` with an initial set of puzzles (start with ~30,
   grow later), covering all four cipher types and all three difficulties.
4. **Stores** — `stores/puzzle.ts` (today's puzzle, guess, timer, solved) and
   `stores/stats.ts` (streak/history in localStorage).
5. **UI** — components + `PlayView`, mobile-first minimal styling.
6. **Share + Stats** — `ResultShare.vue` share text, `StatsView.vue`.
7. **Deploy** — push to a new GitHub repo, deploy to Vercel, verify on a real mobile
   viewport.

## 5. Verification

- `npm run build` — no TypeScript errors.
- `npm run test` — cipher round-trip tests pass.
- `npm run dev` — manually solve one puzzle of each cipher type in a mobile viewport;
  confirm the legend, difficulty badge, timer, and share text all look right, and that
  reloading mid-day doesn't reroll the puzzle.
