import type { CipherModule } from '@/types'

import { hash32, seededShuffle } from '../rng'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function mapFor(seed: number): Map<string, string> {
  const shuffled = seededShuffle(ALPHABET, hash32(seed))
  return new Map(ALPHABET.map((letter, i) => [letter, shuffled[i]]))
}

/** Puzzle letter -> original letter — the direction a solver actually reads: you
 * see a puzzle letter and need to know what to write, never the reverse. */
function inverseMapFor(seed: number): Map<string, string> {
  const map = mapFor(seed)
  return new Map(ALPHABET.map((letter) => [map.get(letter)!, letter]))
}

export const substitution: CipherModule = {
  encode(plaintext, seed) {
    const map = mapFor(seed)
    const ciphertext = plaintext
      .toUpperCase()
      .split('')
      .map((ch) => map.get(ch) ?? ch)
      .join('')
    const inverse = inverseMapFor(seed)
    const key = ALPHABET.map((letter) => `${letter}=${inverse.get(letter)}`).join(' ')
    return { ciphertext, key: `Key: Puzzle letter = original — ${key}` }
  },

  getExample(seed) {
    const inverse = inverseMapFor(seed)
    return ALPHABET.slice(0, 3).map((from) => ({ from, to: inverse.get(from)! }))
  },

  describe() {
    return 'Every letter always becomes the same different letter. The pairs above show a puzzle letter and what it decodes to — find matches in the text and write down the paired letter.'
  },

  getKeyLabel() {
    return null
  },
}
