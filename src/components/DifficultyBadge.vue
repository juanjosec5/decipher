<script setup lang="ts">
import type { Difficulty } from '@/types'

defineProps<{ difficulty: Difficulty }>()

const LABEL: Record<Difficulty, string> = {
  easy: 'EASY',
  medium: 'MEDIUM',
  hard: 'HARD',
}

const TONE: Record<Difficulty, string> = {
  easy: 'border-panel-line text-ink-muted',
  medium: 'border-ink-muted text-ink',
  hard: 'border-ink bg-ink text-ground',
}
</script>

<template>
  <span class="stamp" :class="TONE[difficulty]">{{ LABEL[difficulty] }}</span>
</template>
