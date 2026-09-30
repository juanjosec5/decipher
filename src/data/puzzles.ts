import type { PuzzleSeed } from '@/types'

/**
 * Static, hand-authored puzzle list. Selection is date-based (see
 * `engine/puzzleSelector.ts`), so this array's ORDER is the day-to-day
 * sequence — keep cipher types from repeating back-to-back.
 *
 * `plaintext` is always a full phrase, never a single word. Ciphertext and
 * key are derived at runtime from `id` — never hand-write ciphertext here.
 */
export const puzzles: PuzzleSeed[] = [
  { id: 1, cipherType: 'caesar', difficulty: 'easy', plaintext: 'HONESTY IS THE BEST POLICY' },
  { id: 2, cipherType: 'morse', difficulty: 'easy', plaintext: 'KNOWLEDGE IS POWER' },
  { id: 3, cipherType: 'substitution', difficulty: 'easy', plaintext: 'LESS IS MORE' },
  { id: 4, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'TIME IS PRECIOUS' },
  { id: 5, cipherType: 'caesar', difficulty: 'medium', plaintext: 'ACTIONS SPEAK LOUDER THAN WORDS' },
  { id: 6, cipherType: 'morse', difficulty: 'medium', plaintext: 'GOOD THINGS TAKE TIME' },
  { id: 7, cipherType: 'substitution', difficulty: 'medium', plaintext: 'EVERY CLOUD HAS A SILVER LINING' },
  { id: 8, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'CURIOSITY DID NOT KILL THE CAT' },
  { id: 9, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THOSE WHO DO NOT MOVE DO NOT NOTICE THEIR CHAINS' },
  { id: 10, cipherType: 'morse', difficulty: 'hard', plaintext: 'PATIENCE IS A BITTER PLANT WITH A SWEET FRUIT' },
  { id: 11, cipherType: 'substitution', difficulty: 'hard', plaintext: 'THE OBSTACLE IN THE PATH BECOMES THE PATH' },
  { id: 12, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'WHAT WE THINK WE BECOME OVER TIME' },
  { id: 13, cipherType: 'caesar', difficulty: 'easy', plaintext: 'PRACTICE MAKES PERFECT' },
  { id: 14, cipherType: 'morse', difficulty: 'easy', plaintext: 'SLOW AND STEADY WINS' },
  { id: 15, cipherType: 'substitution', difficulty: 'easy', plaintext: 'SIMPLICITY IS UNDERRATED' },
  { id: 16, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'FORTUNE FAVORS THE BOLD' },
  { id: 17, cipherType: 'caesar', difficulty: 'medium', plaintext: 'THE PEN IS MIGHTIER THAN THE SWORD' },
  { id: 18, cipherType: 'morse', difficulty: 'medium', plaintext: 'SILENCE IS SOMETIMES THE BEST ANSWER' },
  { id: 19, cipherType: 'substitution', difficulty: 'medium', plaintext: 'A SMOOTH SEA NEVER MADE A SKILLED SAILOR' },
  { id: 20, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'FORTUNE REWARDS PREPARATION AND NERVE' },
  { id: 21, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE ONLY WAY OUT OF THE LABYRINTH IS THROUGH' },
  { id: 22, cipherType: 'morse', difficulty: 'hard', plaintext: 'THE MAP IS NOT THE SAME AS THE TERRITORY' },
  { id: 23, cipherType: 'substitution', difficulty: 'hard', plaintext: 'A JOURNEY OF A THOUSAND MILES BEGINS WITH A SINGLE STEP' },
  { id: 24, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'WE SUFFER MORE IN IMAGINATION THAN IN REALITY' },
]
