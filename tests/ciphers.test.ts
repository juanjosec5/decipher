import { describe, expect, it } from 'vitest'

import { caesar } from '@/engine/ciphers/caesar'
import { morse } from '@/engine/ciphers/morse'
import { numericSymbol } from '@/engine/ciphers/numericSymbol'
import { substitution } from '@/engine/ciphers/substitution'
import { hash32 } from '@/engine/rng'

const MODULES = { caesar, morse, substitution, numericSymbol }
// Morse is a fixed public alphabet — it has no seed-dependent key, unlike the others.
const SEED_VARIANT_MODULES = { caesar, substitution, numericSymbol }
const PHRASE = 'THE QUICK BROWN FOX'

describe.each(Object.entries(MODULES))('%s', (_name, mod) => {
  it('is deterministic for a given seed', () => {
    const a = mod.encode(PHRASE, 42)
    const b = mod.encode(PHRASE, 42)
    expect(a).toEqual(b)
  })

  it('produces a ciphertext different from the plaintext', () => {
    const { ciphertext } = mod.encode(PHRASE, 42)
    expect(ciphertext).not.toBe(PHRASE)
  })

  it('returns a non-empty example and key', () => {
    const { key } = mod.encode(PHRASE, 42)
    const example = mod.getExample(42)
    expect(key.length).toBeGreaterThan(0)
    expect(example.length).toBeGreaterThan(0)
    for (const pair of example) {
      expect(pair.from.length).toBeGreaterThan(0)
      expect(pair.to.length).toBeGreaterThan(0)
    }
  })

  it('describes how to decode it in plain language', () => {
    expect(mod.describe(42).length).toBeGreaterThan(0)
  })

  it('getKeyLabel returns a non-empty string or null', () => {
    const label = mod.getKeyLabel(42)
    if (label !== null) expect(label.length).toBeGreaterThan(0)
  })
})

describe('caesar getKeyLabel', () => {
  it('states the same shift used by encode', () => {
    const { key } = caesar.encode(PHRASE, 7)
    const shift = Number(key.match(/\+(\d+)/)![1])
    expect(caesar.getKeyLabel(7)).toBe(`Shift: ${shift}`)
  })
})

describe.each(Object.entries(SEED_VARIANT_MODULES))('%s seed sensitivity', (_name, mod) => {
  it('varies across different seeds', () => {
    const seeds = [1, 2, 3, 4, 5, 6, 7, 8]
    const outputs = new Set(seeds.map((seed) => mod.encode(PHRASE, seed).ciphertext))
    expect(outputs.size).toBeGreaterThan(1)
  })
})

describe('caesar round-trip', () => {
  it('shifting back by the key amount recovers the plaintext', () => {
    const { ciphertext, key } = caesar.encode(PHRASE, 7)
    const shift = Number(key.match(/\+(\d+)/)![1])
    const A = 'A'.charCodeAt(0)
    const decoded = ciphertext
      .split('')
      .map((ch) => {
        const code = ch.charCodeAt(0)
        if (code < A || code > A + 25) return ch
        return String.fromCharCode(A + ((code - A - shift + 26) % 26))
      })
      .join('')
    expect(decoded).toBe(PHRASE)
  })
})

describe('morse', () => {
  it('encodes SOS as the classic pattern', () => {
    expect(morse.encode('SOS', 1).ciphertext).toBe('... --- ...')
  })
})

describe('hash32', () => {
  it('is deterministic and spreads sequential inputs', () => {
    expect(hash32(5)).toBe(hash32(5))
    const values = new Set([1, 2, 3, 4, 5].map(hash32))
    expect(values.size).toBe(5)
  })
})
