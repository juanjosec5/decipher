const SLOT_BASE_SCORE = 250
const MISTAKE_PENALTY = 10
const MIN_SCORE = 25

export function scorePuzzle(elapsedMs: number, mistakes: number): number {
  const seconds = Math.floor(elapsedMs / 1000)
  return Math.max(MIN_SCORE, SLOT_BASE_SCORE - seconds - mistakes * MISTAKE_PENALTY)
}
