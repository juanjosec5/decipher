<script setup lang="ts">
defineProps<{
  plaintext: string
  cipherKey: string
  elapsedLabel: string
  score: number
}>()
</script>

<template>
  <div>
    <p class="font-stamp text-lg text-correct">Cracked in {{ elapsedLabel }} — +{{ score }} points</p>

    <p class="mt-3 font-mono text-lg leading-relaxed text-ink">"{{ plaintext }}"</p>
    <p class="mt-2 text-sm text-ink-muted">{{ cipherKey }}</p>
  </div>
</template>
