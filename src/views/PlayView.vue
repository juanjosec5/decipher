<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle'

import CipherLegend from '../components/CipherLegend.vue'
import CipherText from '../components/CipherText.vue'
import DifficultyBadge from '../components/DifficultyBadge.vue'
import GuessGrid from '../components/GuessGrid.vue'
import ResultShare from '../components/ResultShare.vue'

const store = usePuzzleStore()
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-start justify-between gap-4">
      <CipherLegend
        :cipher-type="store.puzzle.cipherType"
        :seed="store.puzzle.id"
        :difficulty="store.puzzle.difficulty"
      />
      <DifficultyBadge class="mt-1" :difficulty="store.puzzle.difficulty" />
    </div>

    <CipherText :ciphertext="store.puzzle.ciphertext" />

    <ResultShare
      v-if="store.solved"
      :puzzle-number="store.puzzle.puzzleNumber"
      :cipher-type="store.puzzle.cipherType"
      :plaintext="store.puzzle.plaintext"
      :cipher-key="store.puzzle.key"
      :elapsed-label="store.elapsedLabel"
    />
    <!-- TEMP: remove once done testing other cipher types -->
    <button
      v-if="store.solved && store.hasNextTestPuzzle"
      type="button"
      class="rounded-panel border border-dashed border-ink-faint px-3 py-1.5 text-xs text-ink-faint"
      @click="store.nextTestPuzzle()"
    >
      Next puzzle (test)
    </button>
    <div v-else class="space-y-3">
      <p class="font-mono text-sm text-ink-muted">{{ store.elapsedLabel }}</p>
      <GuessGrid />
    </div>
  </div>
</template>
