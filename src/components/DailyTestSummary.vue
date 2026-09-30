<script setup lang="ts">
import { computed, ref } from 'vue'

import { CIPHER_LABELS } from '@/engine/ciphers'
import type { SlotResult } from '@/stores/stats'

const props = defineProps<{
  testNumber: number
  slots: SlotResult[]
}>()

const totalScore = computed(() => props.slots.reduce((sum, s) => sum + s.score, 0))
const totalElapsedLabel = computed(() => {
  const totalMs = props.slots.reduce((sum, s) => sum + s.elapsedMs, 0)
  const totalSeconds = Math.floor(totalMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
})

function slotElapsedLabel(elapsedMs: number): string {
  const totalSeconds = Math.floor(elapsedMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

const copied = ref(false)

async function copyResult() {
  const text = [
    `DeCipher Test #${props.testNumber}`,
    `${totalScore.value} / 1000 pts`,
    `Solved in ${totalElapsedLabel.value}`,
  ].join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => (copied.value = false), 1600)
  } catch {
    // Clipboard API unavailable — nothing to fall back to without a text field to select.
  }
}
</script>

<template>
  <div>
    <p class="font-stamp text-lg text-correct">Test complete — {{ totalScore }} / 1000 points</p>

    <dl class="mt-4 divide-y divide-panel-line border-y border-panel-line">
      <div
        v-for="(slot, i) in slots"
        :key="i"
        class="flex items-baseline justify-between py-2.5 font-mono text-sm"
      >
        <dt class="text-ink-muted">{{ CIPHER_LABELS[slot.cipherType] }}</dt>
        <dd class="text-ink">{{ slotElapsedLabel(slot.elapsedMs) }} · {{ slot.score }} pts</dd>
      </div>
    </dl>

    <button
      type="button"
      class="mt-5 rounded-panel border border-panel-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
      @click="copyResult"
    >
      {{ copied ? 'Copied' : 'Copy result' }}
    </button>
  </div>
</template>
