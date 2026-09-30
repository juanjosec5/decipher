import type { CipherModule } from '@/types'

import { hash32 } from '../rng'

const A = 'A'.charCodeAt(0)

function isAtbash(seed: number): boolean {
  return hash32(seed) % 2 === 0
}

function atbashChar(ch: string): string {
  const code = ch.charCodeAt(0)
  if (code < A || code > A + 25) return ch
  return String.fromCharCode(A + (25 - (code - A)))
}

function a1z26(ch: string): string {
  const code = ch.charCodeAt(0)
  if (code < A || code > A + 25) return ch
  return String(code - A + 1)
}

export const numericSymbol: CipherModule = {
  encode(plaintext, seed) {
    const atbash = isAtbash(seed)
    const upper = plaintext.toUpperCase()

    if (atbash) {
      const ciphertext = upper
        .split('')
        .map((ch) => atbashChar(ch))
        .join('')
      return { ciphertext, key: 'Key: Atbash — A↔Z, B↔Y, C↔X … the alphabet mirrored' }
    }

    const ciphertext = upper
      .split(' ')
      .map((word) =>
        word
          .split('')
          .map((ch) => a1z26(ch))
          .join(' '),
      )
      .join(' / ')
    return { ciphertext, key: 'Key: A1Z26 — A=1, B=2 … Z=26, numbers split by space, words by /' }
  },

  getExample(seed) {
    if (isAtbash(seed)) {
      return ['A', 'B', 'C'].map((from) => ({ from, to: atbashChar(from) }))
    }
    return ['A', 'B', 'C'].map((from) => ({ from, to: a1z26(from) }))
  },

  describe(seed) {
    if (isAtbash(seed)) {
      return 'The alphabet is mirrored end to end — A becomes Z, B becomes Y, M becomes N, and so on.'
    }
    return 'Each number is a letter’s position in the alphabet — 1 is A, 2 is B, up to 26 for Z.'
  },

  getKeyLabel() {
    return null
  },
}
