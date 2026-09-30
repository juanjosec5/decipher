import { defineStore } from 'pinia'
import { computed, onUnmounted, ref } from 'vue'

import { getLetterStatus } from '@/engine/letterStatus'
import { getPuzzleForDay, normalizeGuess } from '@/engine/puzzleSelector'

import { useStatsStore } from './stats'

export const usePuzzleStore = defineStore('puzzle', () => {
  const stats = useStatsStore()

  const puzzle = ref(getPuzzleForDay())
  const answer = normalizeGuess(puzzle.value.plaintext)
  const mistakes = ref(0)

  const priorResult = stats.getResult(puzzle.value.puzzleNumber)
  const solved = ref(Boolean(priorResult))
  const elapsedMs = ref(priorResult?.elapsedMs ?? 0)

  // One entry per character of the answer, spaces pre-filled and never editable.
  const letters = ref<string[]>(
    solved.value ? answer.split('') : answer.split('').map((ch) => (ch === ' ' ? ' ' : '')),
  )

  // The clock starts on the player's first keystroke, not on page load — until
  // then `startedAt`/`timer` simply don't exist yet.
  let startedAt = 0
  let timer: ReturnType<typeof setInterval> | undefined
  let started = false

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
    answer.split('').map((answerChar, i) => getLetterStatus(letters.value[i] ?? '', answerChar)),
  )

  function setLetterAt(index: number, char: string) {
    if (solved.value) return
    const answerChar = answer[index]
    if (answerChar === ' ' || answerChar === undefined) return

    startTimerIfNeeded()

    const upper = char.slice(0, 1).toUpperCase()
    if (upper && upper !== answerChar) mistakes.value += 1
    letters.value[index] = upper

    if (letters.value.join('') === answer) {
      solved.value = true
      elapsedMs.value = Date.now() - startedAt
      if (timer) clearInterval(timer)
      stats.recordResult({
        puzzleNumber: puzzle.value.puzzleNumber,
        cipherType: puzzle.value.cipherType,
        elapsedMs: elapsedMs.value,
        wrongAttempts: mistakes.value,
      })
    }
  }

  return { puzzle, letters, statuses, solved, elapsedLabel, setLetterAt }
})
