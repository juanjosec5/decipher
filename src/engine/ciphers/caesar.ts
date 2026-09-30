import type { CipherModule } from '@/types'

import { hash32 } from '../rng'

const A = 'A'.charCodeAt(0)

function shiftFor(seed: number): number {
  // 1..25 — never 0, so the puzzle is never "encoded" as itself.
  return 1 + (hash32(seed) % 25)
}

function shiftChar(ch: string, shift: number): string {
  const code = ch.charCodeAt(0)
  if (code < A || code > A + 25) return ch
  return String.fromCharCode(A + ((code - A + shift) % 26))
}

export const caesar: CipherModule = {
  encode(plaintext, seed) {
    const shift = shiftFor(seed)
    const ciphertext = plaintext
      .toUpperCase()
      .split('')
      .map((ch) => shiftChar(ch, shift))
      .join('')
    return { ciphertext, key: `Caesar shift +${shift}` }
  },

  getExample(seed) {
    const shift = shiftFor(seed)
    return ['A', 'B', 'C'].map((from) => ({ from, to: shiftChar(from, shift) }))
  },

  describe(seed) {
    const shift = shiftFor(seed)
    return `Every letter was shifted forward ${shift} places. Shift each one back ${shift} to read it — loop back to Z if you go past A.`
  },
}
