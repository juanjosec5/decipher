import type { CipherModule, Difficulty } from '@/types'

import { hash32 } from '../rng'

const A = 'A'.charCodeAt(0)

// Easy/medium use a fixed, memorizable shift for their tier — repetition across
// days is the point, it's what makes them "easy". Hard stays unpredictable (and
// its shift is never stated outright — see CipherLegend's hard-tier fallback).
const EASY_SHIFT = 5
const MEDIUM_SHIFT = 15

function shiftFor(seed: number, difficulty?: Difficulty): number {
  if (difficulty === 'easy') return EASY_SHIFT
  if (difficulty === 'medium') return MEDIUM_SHIFT
  // hard, or no difficulty given (e.g. tests) — 1..25, never 0.
  return 1 + (hash32(seed) % 25)
}

function shiftChar(ch: string, shift: number): string {
  const code = ch.charCodeAt(0)
  if (code < A || code > A + 25) return ch
  return String.fromCharCode(A + ((code - A + shift) % 26))
}

export const caesar: CipherModule = {
  encode(plaintext, seed, difficulty) {
    const shift = shiftFor(seed, difficulty)
    const ciphertext = plaintext
      .toUpperCase()
      .split('')
      .map((ch) => shiftChar(ch, shift))
      .join('')
    return { ciphertext, key: `Key: Caesar shift +${shift}` }
  },

  getExample(seed, difficulty) {
    const shift = shiftFor(seed, difficulty)
    return ['A', 'B', 'C'].map((from) => ({ from, to: shiftChar(from, shift) }))
  },

  describe(seed, difficulty) {
    const shift = shiftFor(seed, difficulty)
    return `Every letter was shifted forward ${shift} places. Shift each one back ${shift} to read it — loop back to Z if you go past A.`
  },

  getKeyLabel(seed, difficulty) {
    return `Shift: ${shiftFor(seed, difficulty)}`
  },
}
