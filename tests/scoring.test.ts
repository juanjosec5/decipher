import { describe, expect, it } from 'vitest'

import { scorePuzzle } from '@/engine/scoring'

describe('scorePuzzle', () => {
  it('starts at 250 for an instant, mistake-free solve', () => {
    expect(scorePuzzle(0, 0)).toBe(250)
  })

  it('deducts one point per elapsed second', () => {
    expect(scorePuzzle(45_000, 0)).toBe(205)
  })

  it('deducts ten points per mistake', () => {
    expect(scorePuzzle(0, 3)).toBe(220)
  })

  it('combines time and mistake penalties', () => {
    expect(scorePuzzle(30_000, 2)).toBe(250 - 30 - 20)
  })

  it('never drops below the floor', () => {
    expect(scorePuzzle(10_000_000, 50)).toBe(25)
  })
})
