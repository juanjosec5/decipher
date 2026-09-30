import { track } from '@vercel/analytics'
import { defineStore } from 'pinia'
import { computed, onUnmounted, ref } from 'vue'

import { getLetterStatus } from '@/engine/letterStatus'
import {
  getTestForDay,
  LAUNCH_DATE,
  normalizeGuess,
  TOTAL_GROUPS,
} from '@/engine/puzzleSelector'
import type { DailyTest } from '@/engine/puzzleSelector'
import { scorePuzzle } from '@/engine/scoring'

import { useStatsStore } from './stats'
import type { SlotResult } from './stats'

export const usePuzzleStore = defineStore('puzzle', () => {
  const stats = useStatsStore()

  const test = ref<DailyTest>(getTestForDay())
  const currentSlot = ref(0)
  const slotResults = ref<(SlotResult | null)[]>(test.value.puzzles.map(() => null))

  const puzzle = computed(() => test.value.puzzles[currentSlot.value])
  const answer = ref('')
  const mistakes = ref(0)
  const solved = ref(false)
  const elapsedMs = ref(0)
  const letters = ref<string[]>([])

  // The clock starts on the player's first keystroke, not on page load — until
  // then `startedAt`/`timer` simply don't exist yet.
  let startedAt = 0
  let timer: ReturnType<typeof setInterval> | undefined
  let started = false

  // Set once the temporary "jump to another day" test control is used — from
  // then on, completing a test never writes to the real streak/history.
  let isTestMode = false
  let testDaysAdvanced = 0
  let testStarted = false

  function loadSlot(slotIndex: number) {
    if (timer) clearInterval(timer)
    timer = undefined
    started = false
    startedAt = 0

    currentSlot.value = slotIndex
    mistakes.value = 0
    solved.value = false
    elapsedMs.value = 0

    const next = test.value.puzzles[slotIndex]
    answer.value = normalizeGuess(next.plaintext)
    // One entry per character of the answer, spaces pre-filled and never editable.
    letters.value = answer.value.split('').map((ch) => (ch === ' ' ? ' ' : ''))
  }

  const priorTestResult = stats.getResult(test.value.testNumber)
  if (priorTestResult) {
    slotResults.value = priorTestResult.slots.map((s) => ({ ...s }))
    loadSlot(test.value.puzzles.length - 1)
    solved.value = true
  } else {
    loadSlot(0)
  }

  function startTimerIfNeeded() {
    if (started || solved.value) return
    started = true
    startedAt = Date.now()
    timer = setInterval(() => {
      elapsedMs.value = Date.now() - startedAt
    }, 1000)
  }

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  const elapsedLabel = computed(() => {
    const totalSeconds = Math.floor(elapsedMs.value / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${String(seconds).padStart(2, '0')}`
  })

  const statuses = computed(() =>
    answer.value.split('').map((answerChar, i) => getLetterStatus(letters.value[i] ?? '', answerChar)),
  )

  const isTestComplete = computed(() => slotResults.value.every((r) => r !== null))
  const currentScore = computed(() => slotResults.value[currentSlot.value]?.score ?? null)
  const totalScore = computed(() =>
    slotResults.value.reduce((sum, r) => sum + (r?.score ?? 0), 0),
  )
  const hasNextSlot = computed(() => currentSlot.value < test.value.puzzles.length - 1)
  const hasNextTestDay = computed(() => testDaysAdvanced < TOTAL_GROUPS - 1)

  function setLetterAt(index: number, char: string) {
    if (solved.value) return
    const answerChar = answer.value[index]
    if (answerChar === ' ' || answerChar === undefined) return

    startTimerIfNeeded()

    if (!testStarted && !isTestMode) {
      testStarted = true
      track('test_started')
    }

    const upper = char.slice(0, 1).toUpperCase()
    if (upper && upper !== answerChar) mistakes.value += 1
    letters.value[index] = upper

    if (letters.value.join('') === answer.value) {
      solved.value = true
      elapsedMs.value = Date.now() - startedAt
      if (timer) clearInterval(timer)

      const result: SlotResult = {
        cipherType: puzzle.value.cipherType,
        elapsedMs: elapsedMs.value,
        mistakes: mistakes.value,
        score: scorePuzzle(elapsedMs.value, mistakes.value),
      }
      slotResults.value[currentSlot.value] = result

      const isLastSlot = currentSlot.value === test.value.puzzles.length - 1
      if (isLastSlot && !isTestMode) {
        const slots = slotResults.value.filter((r): r is SlotResult => r !== null)
        const total = slots.reduce((sum, s) => sum + s.score, 0)
        stats.recordResult({ testNumber: test.value.testNumber, totalScore: total, slots })
        track('test_completed', { score: total })
      }
    }
  }

  function advanceToNextSlot() {
    if (!solved.value || !hasNextSlot.value) return
    loadSlot(currentSlot.value + 1)
  }

  /** TEMP: jumps to a different day's test, for trying other content without
   * waiting on real calendar days. Never repeats a day, never touches real stats. */
  function nextTestDay(): boolean {
    if (!hasNextTestDay.value) return false
    isTestMode = true
    testDaysAdvanced += 1
    const nextDate = new Date(LAUNCH_DATE.getTime() + test.value.testNumber * 86_400_000)
    test.value = getTestForDay(nextDate)
    slotResults.value = test.value.puzzles.map(() => null)
    loadSlot(0)
    return true
  }

  return {
    test,
    currentSlot,
    puzzle,
    letters,
    statuses,
    solved,
    elapsedLabel,
    setLetterAt,
    slotResults,
    currentScore,
    totalScore,
    isTestComplete,
    hasNextSlot,
    hasNextTestDay,
    advanceToNextSlot,
    nextTestDay,
  }
})
