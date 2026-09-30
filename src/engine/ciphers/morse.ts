import type { CipherModule } from '@/types'

export const MORSE_ALPHABET: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
}

export const morse: CipherModule = {
  encode(plaintext) {
    const ciphertext = plaintext
      .toUpperCase()
      .split(' ')
      .map((word) =>
        word
          .split('')
          .map((ch) => MORSE_ALPHABET[ch] ?? ch)
          .join(' '),
      )
      .join(' / ')
    return { ciphertext, key: 'International Morse Code — letters split by space, words by /' }
  },

  getExample() {
    return ['S', 'O', 'A'].map((from) => ({ from, to: MORSE_ALPHABET[from] }))
  },

  describe() {
    return 'Each letter is written as dots and dashes. A space splits letters, a / splits words — match each group against the Morse alphabet.'
  },

  getKeyLabel() {
    return null
  },
}
