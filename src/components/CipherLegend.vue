<script setup lang="ts">
import { computed } from 'vue'

import { ciphers, CIPHER_LABELS } from '@/engine/ciphers'
import type { CipherType, Difficulty } from '@/types'

import MorseReferenceModal from './MorseReferenceModal.vue'

const props = defineProps<{ cipherType: CipherType; seed: number; difficulty: Difficulty }>()

const HARD_FALLBACK = 'No hint given — work it out from the example above.'

const label = computed(() => CIPHER_LABELS[props.cipherType])
const example = computed(() => ciphers[props.cipherType].getExample(props.seed))
// Substitution and numeric/Atbash are fixed equivalences, not shifts — "=" matches
// the key format shown after solving (e.g. "A=Q B=W C=E"); Caesar/Morse keep the arrow.
const EQUALS_CIPHERS: CipherType[] = ['substitution', 'numericSymbol']
const pairSeparator = computed(() => (EQUALS_CIPHERS.includes(props.cipherType) ? '=' : '→'))
const description = computed(() =>
  props.difficulty === 'hard' ? HARD_FALLBACK : ciphers[props.cipherType].describe(props.seed),
)
</script>

<template>
  <div>
    <h1 class="font-stamp text-xl text-ink">{{ label }}</h1>
    <p class="mt-1.5 font-mono text-sm tracking-wide text-ink-muted">
      <span v-for="(pair, i) in example" :key="pair.from">
        <span v-if="i > 0">&nbsp;&nbsp;</span>{{ pair.from }} {{ pairSeparator }} {{ pair.to }}
      </span>
    </p>
    <p class="mt-1.5 text-xs leading-snug text-ink-faint">{{ description }}</p>
    <MorseReferenceModal v-if="cipherType === 'morse'" />
  </div>
</template>
