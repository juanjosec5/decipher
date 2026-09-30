<script setup lang="ts">
import { ref } from 'vue'

import { CIPHER_LABELS } from '@/engine/ciphers'
import type { CipherType } from '@/types'

const props = defineProps<{
  puzzleNumber: number
  cipherType: CipherType
  plaintext: string
  cipherKey: string
  elapsedLabel: string
}>()

const copied = ref(false)

async function copyResult() {
  const text = [
    `DeCipher #${props.puzzleNumber}`,
    CIPHER_LABELS[props.cipherType],
    `Solved in ${props.elapsedLabel}`,
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
    <p class="font-stamp text-lg text-correct">Cracked in {{ elapsedLabel }}</p>

    <p class="mt-3 font-mono text-lg leading-relaxed text-ink">"{{ plaintext }}"</p>
    <p class="mt-2 text-sm text-ink-muted">{{ cipherKey }}</p>

    <button
      type="button"
      class="mt-5 rounded-panel border border-panel-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink"
      @click="copyResult"
    >
      {{ copied ? 'Copied' : 'Copy result' }}
    </button>
  </div>
</template>
