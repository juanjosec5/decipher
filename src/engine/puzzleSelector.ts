import { puzzles } from '@/data/puzzles'
import type { EncodedPuzzle, PuzzleSeed } from '@/types'

import { ciphers } from './ciphers'

/** The day DeCipher launched — puzzle #1. Local calendar day, not UTC. */
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

export function getPuzzleForDay(now: Date = new Date()): TodayPuzzle {
  const days = Math.max(0, daysSinceLaunch(now))
  const puzzleNumber = days + 1
  const index = days % puzzles.length
  return buildPuzzle(puzzles[index], puzzleNumber)
}

export function normalizeGuess(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, ' ')
}
