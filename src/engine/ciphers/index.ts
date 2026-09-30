import type { CipherModule, CipherType } from '@/types'

import { caesar } from './caesar'
import { morse } from './morse'
import { numericSymbol } from './numericSymbol'
import { substitution } from './substitution'

export const ciphers: Record<CipherType, CipherModule> = {
  caesar,
  morse,
  substitution,
  numericSymbol,
}

export const CIPHER_LABELS: Record<CipherType, string> = {
  caesar: 'Caesar Shift',
  morse: 'Morse Code',
  substitution: 'Substitution',
  numericSymbol: 'Numeric Cipher',
}
