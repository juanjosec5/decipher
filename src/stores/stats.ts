import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { CipherType } from '@/types'

const STORAGE_KEY = 'decipher:history'

export interface DayResult {
  puzzleNumber: number
  cipherType: CipherType
  elapsedMs: number
  wrongAttempts: number
}

function loadHistory(): Record<number, DayResult> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const useStatsStore = defineStore('stats', () => {
  const history = ref<Record<number, DayResult>>(loadHistory())

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
    } catch {
      // localStorage unavailable (private mode, quota) — stats just won't persist.
    }
  }

  function recordResult(result: DayResult) {
    history.value[result.puzzleNumber] = result
    persist()
  }

  function getResult(puzzleNumber: number): DayResult | undefined {
    return history.value[puzzleNumber]
  }

  const solvedCount = computed(() => Object.keys(history.value).length)

  const currentStreak = computed(() => {
    const numbers = Object.keys(history.value)
      .map(Number)
      .sort((a, b) => b - a)
    if (numbers.length === 0) return 0
    let streak = 0
    let expected = numbers[0]
    for (const n of numbers) {
      if (n !== expected) break
      streak += 1
      expected -= 1
    }
    return streak
  })

  const longestStreak = computed(() => {
    const numbers = Object.keys(history.value)
      .map(Number)
      .sort((a, b) => a - b)
    let longest = 0
    let run = 0
    let previous: number | null = null
    for (const n of numbers) {
      run = previous !== null && n === previous + 1 ? run + 1 : 1
      longest = Math.max(longest, run)
      previous = n
    }
    return longest
  })

  return { history, recordResult, getResult, solvedCount, currentStreak, longestStreak }
})
