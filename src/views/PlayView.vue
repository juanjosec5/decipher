<script setup lang="ts">
import { computed } from 'vue'

import { usePuzzleStore } from '@/stores/puzzle'
import type { SlotResult } from '@/stores/stats'

import CipherLegend from '../components/CipherLegend.vue'
import CipherText from '../components/CipherText.vue'
import DailyTestSummary from '../components/DailyTestSummary.vue'
import DifficultyBadge from '../components/DifficultyBadge.vue'
import GuessGrid from '../components/GuessGrid.vue'
import ResultShare from '../components/ResultShare.vue'

const store = usePuzzleStore()

const completedSlots = computed(() =>
  store.slotResults.filter((r): r is SlotResult => r !== null),
)
</script>

<template>
  <div class="space-y-6">
    <DailyTestSummary
      v-if="store.isTestComplete"
      :test-number="store.test.testNumber"
      :slots="completedSlots"
    />

    <template v-else>
      <div class="flex items-start justify-between gap-4">
        <CipherLegend
          :cipher-type="store.puzzle.cipherType"
          :seed="store.puzzle.id"
          :difficulty="store.puzzle.difficulty"
        />
        <DifficultyBadge class="mt-1" :difficulty="store.puzzle.difficulty" />
      </div>

      <p class="-mt-3 font-mono text-xs text-ink-faint">
        Puzzle {{ store.currentSlot + 1 }} of {{ store.test.puzzles.length }}
      </p>

      <CipherText :ciphertext="store.puzzle.ciphertext" />

      <template v-if="store.solved">
        <ResultShare
          :plaintext="store.puzzle.plaintext"
          :cipher-key="store.puzzle.key"
          :elapsed-label="store.elapsedLabel"
          :score="store.currentScore ?? 0"
        />
        <button
          type="button"
          class="rounded-panel bg-ink px-4 py-2 text-sm font-medium text-ground transition-opacity hover:opacity-90"
          @click="store.advanceToNextSlot()"
        >
          Next puzzle ({{ store.currentSlot + 2 }} of {{ store.test.puzzles.length }})
        </button>
      </template>
      <div v-else class="space-y-3">
        <p class="font-mono text-sm text-ink-muted">{{ store.elapsedLabel }}</p>
        <GuessGrid />
      </div>
    </template>

    <!-- TEMP: remove once done testing other cipher types -->
    <button
      v-if="store.isTestComplete && store.hasNextTestDay"
      type="button"
      class="rounded-panel border border-dashed border-ink-faint px-3 py-1.5 text-xs text-ink-faint"
      @click="store.nextTestDay()"
    >
      Next test day (test)
    </button>
  </div>
</template>
