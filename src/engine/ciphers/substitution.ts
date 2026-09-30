import type { CipherModule } from '@/types'

import { hash32, seededShuffle } from '../rng'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function mapFor(seed: number): Map<string, string> {
  const shuffled = seededShuffle(ALPHABET, hash32(seed))
  return new Map(ALPHABET.map((letter, i) => [letter, shuffled[i]]))
}

export const substitution: CipherModule = {
  encode(plaintext, seed) {
    const map = mapFor(seed)
    const ciphertext = plaintext
      .toUpperCase()
      .split('')
      .map((ch) => map.get(ch) ?? ch)
      .join('')
    const key = ALPHABET.map((letter) => `${letter}=${map.get(letter)}`).join(' ')
    return { ciphertext, key: `Substitution map — ${key}` }
  },

  getExample(seed) {
    const map = mapFor(seed)
    return ALPHABET.slice(0, 3).map((from) => ({ from, to: map.get(from)! }))
  },

  describe() {
    return 'Every letter always swaps for the same different letter throughout the message. Use repeated patterns and the example pairs to work out the rest.'
  },
}
