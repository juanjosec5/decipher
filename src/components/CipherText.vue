<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ ciphertext: string }>()

// Morse and A1Z26 separate letters by a plain space and words by " / " — every
// space is otherwise a valid line-break point, so the browser can wrap in the
// middle of a single letter's code. Replace intra-word spaces with a
// non-breaking space so a line can only ever break at the word boundary.
const displayText = computed(() => {
  if (!props.ciphertext.includes(' / ')) return props.ciphertext
  return props.ciphertext
    .split(' / ')
    .map((word) => word.replace(/ /g, ' '))
    .join(' / ')
})
</script>

<template>
  <div class="rounded-panel border border-panel-line bg-panel px-4 py-5">
    <p class="font-mono text-lg leading-relaxed tracking-wide break-words text-ink">
      {{ displayText }}
    </p>
  </div>
</template>
