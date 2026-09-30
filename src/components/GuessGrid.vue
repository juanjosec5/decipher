<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'
import { computed, nextTick, reactive, ref, watch } from 'vue'

import { normalizeGuess } from '@/engine/puzzleSelector'
import { usePuzzleStore } from '@/stores/puzzle'

const POP_DURATION_MS = 300

const store = usePuzzleStore()

const poppingIndexes = reactive(new Set<number>())
watch(
  () => store.statuses,
  (next, prev) => {
    next.forEach((status, i) => {
      if (status === 'correct' && prev?.[i] !== 'correct') {
        poppingIndexes.add(i)
        setTimeout(() => poppingIndexes.delete(i), POP_DURATION_MS)
      }
    })
  },
)

const answer = computed(() => normalizeGuess(store.puzzle.plaintext))

/** Indices grouped by word, so a word's boxes wrap as one unit, never split mid-word. */
const words = computed(() => {
  const groups: number[][] = []
  let current: number[] = []
  answer.value.split('').forEach((ch, i) => {
    if (ch === ' ') {
      if (current.length) groups.push(current)
      current = []
    } else {
      current.push(i)
    }
  })
  if (current.length) groups.push(current)
  return groups
})

const editableIndexes = computed(() => words.value.flat())

const inputRefs = ref<Record<number, HTMLInputElement>>({})
function setInputRef(i: number, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLInputElement) inputRefs.value[i] = el
}

function focusIndex(i: number) {
  nextTick(() => inputRefs.value[i]?.focus())
}

function nextEditableIndex(from: number): number | null {
  const idxs = editableIndexes.value
  const pos = idxs.indexOf(from)
  return pos >= 0 && pos + 1 < idxs.length ? idxs[pos + 1] : null
}

function prevEditableIndex(from: number): number | null {
  const idxs = editableIndexes.value
  const pos = idxs.indexOf(from)
  return pos > 0 ? idxs[pos - 1] : null
}

function onInput(i: number, event: Event) {
  const target = event.target as HTMLInputElement
  const char = target.value.slice(-1)
  store.setLetterAt(i, char)
  if (char) {
    const next = nextEditableIndex(i)
    if (next !== null) focusIndex(next)
  }
}

function onKeydown(i: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !store.letters[i]) {
    event.preventDefault()
    const prev = prevEditableIndex(i)
    if (prev !== null) {
      store.setLetterAt(prev, '')
      focusIndex(prev)
    }
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    const prev = prevEditableIndex(i)
    if (prev !== null) focusIndex(prev)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    const next = nextEditableIndex(i)
    if (next !== null) focusIndex(next)
  }
}

function onFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  // Select-on-focus so clicking (or tabbing/arrowing) into a filled box lets you
  // just type over it, instead of getting stuck at maxlength=1.
  target.select()
  // The on-screen keyboard covers the bottom of the viewport — pull the box
  // (and the rest of the grid around it) up above it instead of letting the
  // keyboard hide what you're typing.
  target.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

function onPaste(i: number, event: ClipboardEvent) {
  event.preventDefault()
  const text = event.clipboardData?.getData('text') ?? ''
  const chars = text.toUpperCase().replace(/[^A-Z]/g, '').split('')
  const idxs = editableIndexes.value
  let pos = idxs.indexOf(i)
  for (const ch of chars) {
    if (pos >= idxs.length) break
    store.setLetterAt(idxs[pos], ch)
    pos++
  }
  const last = idxs[Math.min(pos, idxs.length - 1)]
  if (last !== undefined) focusIndex(last)
}
</script>

<template>
  <div class="flex flex-wrap gap-x-2.5 gap-y-2">
    <div v-for="(word, w) in words" :key="w" class="flex gap-1">
      <input
        v-for="i in word"
        :key="i"
        :ref="(el) => setInputRef(i, el)"
        :value="store.letters[i]"
        type="text"
        inputmode="text"
        autocomplete="off"
        autocapitalize="characters"
        autocorrect="off"
        spellcheck="false"
        data-lpignore="true"
        data-1p-ignore
        data-form-type="other"
        maxlength="1"
        class="h-9 w-7 shrink-0 border-b text-center font-mono text-sm font-medium uppercase outline-none transition-colors"
        :class="{
          'border-b-2 border-correct text-correct': store.statuses[i] === 'correct',
          'border-b-2 border-wrong text-wrong': store.statuses[i] === 'wrong',
          'border-panel-line text-ink focus:border-ink': store.statuses[i] === 'empty',
          'animate-letter-pop': poppingIndexes.has(i),
        }"
        @input="onInput(i, $event)"
        @keydown="onKeydown(i, $event)"
        @focus="onFocus"
        @paste="onPaste(i, $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.animate-letter-pop {
  animation: letter-pop 300ms ease-out;
}
</style>
