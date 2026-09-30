export type LetterStatus = 'empty' | 'correct' | 'wrong' | 'space'

/** Pure per-character comparison used to color a single grid box as you type. */
export function getLetterStatus(typed: string, answerChar: string): LetterStatus {
  if (answerChar === ' ') return 'space'
  if (!typed) return 'empty'
  return typed.toUpperCase() === answerChar.toUpperCase() ? 'correct' : 'wrong'
}
