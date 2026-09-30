<script setup lang="ts">
import { ref } from 'vue'

import { usePuzzleStore } from '@/stores/puzzle'

import PlayView from './views/PlayView.vue'
import StatsView from './views/StatsView.vue'

const view = ref<'play' | 'stats'>('play')
const puzzle = usePuzzleStore()
</script>

<template>
  <div class="mx-auto min-h-screen max-w-sm px-5 pt-6 pb-72">
    <header class="flex items-baseline justify-between">
      <span class="font-stamp text-base tracking-wide text-ink">DECIPHER</span>
      <div class="flex items-baseline gap-4">
        <span class="font-mono text-sm text-ink-muted">No. {{ puzzle.puzzle.puzzleNumber }}</span>
        <button
          type="button"
          class="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          @click="view = view === 'play' ? 'stats' : 'play'"
        >
          {{ view === 'play' ? 'Stats' : 'Play' }}
        </button>
      </div>
    </header>

    <div class="mt-6 border-t border-panel-line" />

    <main class="mt-8">
      <PlayView v-if="view === 'play'" />
      <StatsView v-else />
    </main>
  </div>
</template>
