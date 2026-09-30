<script setup lang="ts">
import { useStatsStore } from '@/stores/stats'

const stats = useStatsStore()

const rows = [
  { label: 'Current streak', value: () => stats.currentStreak },
  { label: 'Longest streak', value: () => stats.longestStreak },
  { label: 'Tests completed', value: () => stats.solvedCount },
]
</script>

<template>
  <div class="space-y-5">
    <h1 class="font-stamp text-xl text-ink">Your record</h1>

    <dl class="divide-y divide-panel-line border-y border-panel-line">
      <div v-for="row in rows" :key="row.label" class="flex items-baseline justify-between py-3">
        <dt class="text-sm text-ink-muted">{{ row.label }}</dt>
        <dd class="font-mono text-lg text-ink">{{ row.value() }}</dd>
      </div>
    </dl>

    <p v-if="stats.solvedCount === 0" class="text-sm text-ink-muted">
      Complete today's test to start your record.
    </p>
  </div>
</template>
