<script setup lang="ts">
import { computed } from 'vue'

import { ciphers, CIPHER_LABELS } from '@/engine/ciphers'
import type { CipherType } from '@/types'

const props = defineProps<{ cipherType: CipherType; seed: number }>()

const label = computed(() => CIPHER_LABELS[props.cipherType])
const example = computed(() => ciphers[props.cipherType].getExample(props.seed))
const description = computed(() => ciphers[props.cipherType].describe(props.seed))
</script>

<template>
  <div>
    <h1 class="font-stamp text-xl text-ink">{{ label }}</h1>
    <p class="mt-1.5 font-mono text-sm tracking-wide text-ink-muted">
      <span v-for="(pair, i) in example" :key="pair.from">
        <span v-if="i > 0">&nbsp;&nbsp;</span>{{ pair.from }} → {{ pair.to }}
      </span>
    </p>
    <p class="mt-1.5 text-xs leading-snug text-ink-faint">{{ description }}</p>
  </div>
</template>
