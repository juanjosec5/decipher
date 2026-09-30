<script setup lang="ts">
import type { Difficulty } from '@/types'

defineProps<{ difficulty: Difficulty }>()

const LABEL: Record<Difficulty, string> = {
  easy: 'EASY',
  medium: 'MEDIUM',
  hard: 'HARD',
}

const TONE: Record<Difficulty, string> = {
  easy: 'border-correct text-correct',
  medium: 'border-medium text-medium',
  hard: 'border-wrong text-wrong',
}
</script>

<template>
  <span class="stamp" :class="TONE[difficulty]">{{ LABEL[difficulty] }}</span>
</template>
