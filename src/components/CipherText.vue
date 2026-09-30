<script setup lang="ts">
defineProps<{ ciphertext: string }>()
</script>

<template>
  <div class="rounded-panel border border-panel-line bg-panel px-4 py-5">
    <p class="font-mono text-lg leading-relaxed tracking-wide break-words text-ink">
      {{ ciphertext }}
    </p>
  </div>
</template>
