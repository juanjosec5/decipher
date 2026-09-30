import { describe, expect, it } from 'vitest'

import { getLetterStatus } from '@/engine/letterStatus'

describe('getLetterStatus', () => {
  it('is space when the answer character is a space, regardless of what was typed', () => {
    expect(getLetterStatus('', ' ')).toBe('space')
    expect(getLetterStatus('X', ' ')).toBe('space')
  })

  it('is empty when nothing has been typed yet', () => {
    expect(getLetterStatus('', 'H')).toBe('empty')
  })

  it('is correct when the typed letter matches, case-insensitively', () => {
    expect(getLetterStatus('h', 'H')).toBe('correct')
    expect(getLetterStatus('H', 'H')).toBe('correct')
  })

  it('is wrong when the typed letter does not match', () => {
    expect(getLetterStatus('X', 'H')).toBe('wrong')
  })
})
