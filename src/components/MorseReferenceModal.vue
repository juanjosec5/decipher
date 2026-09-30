<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

import { MORSE_ALPHABET } from '@/engine/ciphers/morse'

const entries = Object.entries(MORSE_ALPHABET)
const open = ref(false)

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(open, (isOpen) => {
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <button
    type="button"
    class="mt-2 rounded-panel bg-ink px-3 py-1.5 text-xs font-medium text-ground transition-opacity hover:opacity-90"
    @click="open = true"
  >
    Full Morse alphabet
  </button>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-ground/85 px-5"
      @click.self="close"
    >
      <div
        class="max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-panel border border-panel-line bg-panel p-5"
      >
        <div class="flex items-center justify-between">
          <h2 class="font-stamp text-base text-ink">Morse Code</h2>
          <button type="button" class="text-xs text-ink-muted hover:text-ink" @click="close">
            Close
          </button>
        </div>
        <div class="mt-4 grid grid-cols-4 gap-x-3 gap-y-2 font-mono text-sm">
          <div v-for="[letter, code] in entries" :key="letter" class="flex items-baseline justify-between">
            <span class="text-ink">{{ letter }}</span>
            <span class="text-ink-muted">{{ code }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
