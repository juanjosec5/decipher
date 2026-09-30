import { defineStore } from 'pinia'
import { computed, onUnmounted, ref } from 'vue'

import { puzzles } from '@/data/puzzles'
import { getLetterStatus } from '@/engine/letterStatus'
import { buildPuzzle, getPuzzleForDay, normalizeGuess } from '@/engine/puzzleSelector'
import type { TodayPuzzle } from '@/engine/puzzleSelector'

import { useStatsStore } from './stats'

export const usePuzzleStore = defineStore('puzzle', () => {
  const stats = useStatsStore()

  const puzzle = ref<TodayPuzzle>(getPuzzleForDay())
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

  // Set once the temporary "next puzzle" test button is used — from then on,
  // solving never writes to the real streak/history (see `nextTestPuzzle`).
  let isTestMode = false

  function loadPuzzle(next: TodayPuzzle, { trackStats }: { trackStats: boolean }) {
    if (timer) clearInterval(timer)
    timer = undefined
    started = false
    startedAt = 0

    puzzle.value = next
    answer.value = normalizeGuess(next.plaintext)
    mistakes.value = 0

    const priorResult = trackStats ? stats.getResult(next.puzzleNumber) : undefined
    solved.value = Boolean(priorResult)
    elapsedMs.value = priorResult?.elapsedMs ?? 0

    // One entry per character of the answer, spaces pre-filled and never editable.
    letters.value = solved.value
      ? answer.value.split('')
      : answer.value.split('').map((ch) => (ch === ' ' ? ' ' : ''))
  }

  loadPuzzle(puzzle.value, { trackStats: true })

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

  const hasNextTestPuzzle = computed(() => {
    const index = puzzles.findIndex((p) => p.id === puzzle.value.id)
    return index >= 0 && index + 1 < puzzles.length
  })

  function setLetterAt(index: number, char: string) {
    if (solved.value) return
    const answerChar = answer.value[index]
    if (answerChar === ' ' || answerChar === undefined) return

    startTimerIfNeeded()

    const upper = char.slice(0, 1).toUpperCase()
    if (upper && upper !== answerChar) mistakes.value += 1
    letters.value[index] = upper

    if (letters.value.join('') === answer.value) {
      solved.value = true
      elapsedMs.value = Date.now() - startedAt
      if (timer) clearInterval(timer)
      if (!isTestMode) {
        stats.recordResult({
          puzzleNumber: puzzle.value.puzzleNumber,
          cipherType: puzzle.value.cipherType,
          elapsedMs: elapsedMs.value,
          wrongAttempts: mistakes.value,
        })
      }
    }
  }

  /** TEMP: advances to the next puzzle in the static list, for testing other
   * cipher types. Never repeats, never wraps, never touches real stats. */
  function nextTestPuzzle(): boolean {
    const index = puzzles.findIndex((p) => p.id === puzzle.value.id)
    if (index < 0 || index + 1 >= puzzles.length) return false
    isTestMode = true
    loadPuzzle(buildPuzzle(puzzles[index + 1], index + 2), { trackStats: false })
    return true
  }

  return {
    puzzle,
    letters,
    statuses,
    solved,
    elapsedLabel,
    setLetterAt,
    hasNextTestPuzzle,
    nextTestPuzzle,
  }
})
