import { puzzles } from '@/data/puzzles'
import type { EncodedPuzzle, PuzzleSeed } from '@/types'

import { ciphers } from './ciphers'

/** The day DeCipher launched — test #1. Local calendar day, not UTC. */
export const LAUNCH_DATE = new Date(2026, 8, 29)

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function daysSinceLaunch(now: Date = new Date()): number {
  const start = startOfLocalDay(LAUNCH_DATE).getTime()
  const today = startOfLocalDay(now).getTime()
  return Math.round((today - start) / 86_400_000)
}

export interface TodayPuzzle extends EncodedPuzzle {
  puzzleNumber: number
}

export function buildPuzzle(seed: PuzzleSeed, puzzleNumber: number): TodayPuzzle {
  const { ciphertext, key } = ciphers[seed.cipherType].encode(seed.plaintext, seed.id)
  return { ...seed, ciphertext, key, puzzleNumber }
}

/** One of each cipher type, in `puzzles.ts` order — the unit of a day's test. */
export const GROUP_SIZE = 4
export const TOTAL_GROUPS = Math.floor(puzzles.length / GROUP_SIZE)

export interface DailyTest {
  testNumber: number
  puzzles: TodayPuzzle[]
}

export function getTestForDay(now: Date = new Date()): DailyTest {
  const days = Math.max(0, daysSinceLaunch(now))
  const testNumber = days + 1
  const groupIndex = days % TOTAL_GROUPS
  const start = groupIndex * GROUP_SIZE
  const seeds = puzzles.slice(start, start + GROUP_SIZE)
  return { testNumber, puzzles: seeds.map((seed) => buildPuzzle(seed, testNumber)) }
}

export function normalizeGuess(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, ' ')
}
