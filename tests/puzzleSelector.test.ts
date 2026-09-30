import { describe, expect, it } from 'vitest'

import { puzzles } from '@/data/puzzles'
import { GROUP_SIZE, getTestForDay, LAUNCH_DATE, TOTAL_GROUPS } from '@/engine/puzzleSelector'

function dayOffset(days: number): Date {
  return new Date(LAUNCH_DATE.getTime() + days * 86_400_000)
}

describe('getTestForDay', () => {
  it('covers exactly 30 days before the schedule repeats', () => {
    expect(puzzles.length).toBe(120)
    expect(TOTAL_GROUPS).toBe(30)
  })

  it('returns 4 puzzles, one of each cipher type, matching the authored group', () => {
    for (let day = 0; day < TOTAL_GROUPS; day++) {
      const test = getTestForDay(dayOffset(day))
      const expectedGroup = puzzles.slice(day * GROUP_SIZE, day * GROUP_SIZE + GROUP_SIZE)
      expect(test.testNumber).toBe(day + 1)
      expect(test.puzzles.map((p) => p.id)).toEqual(expectedGroup.map((p) => p.id))
      expect(test.puzzles.map((p) => p.cipherType)).toEqual([
        'caesar',
        'morse',
        'substitution',
        'numericSymbol',
      ])
      const difficulties = new Set(test.puzzles.map((p) => p.difficulty))
      expect(difficulties.size).toBe(1)
    }
  })

  it('wraps back to day 1 once all 30 groups are used', () => {
    const day1 = getTestForDay(dayOffset(0))
    const day31 = getTestForDay(dayOffset(30))
    expect(day31.puzzles.map((p) => p.id)).toEqual(day1.puzzles.map((p) => p.id))
    expect(day31.testNumber).toBe(31)
  })
})
