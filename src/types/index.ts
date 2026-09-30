export type CipherType = 'caesar' | 'morse' | 'substitution' | 'numericSymbol'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface PuzzleSeed {
  id: number
  cipherType: CipherType
  difficulty: Difficulty
  plaintext: string
}

export interface EncodedPuzzle extends PuzzleSeed {
  ciphertext: string
  key: string
}

export interface CipherExamplePair {
  from: string
  to: string
}

export interface CipherModule {
  encode(plaintext: string, seed: number): { ciphertext: string; key: string }
  getExample(seed: number): CipherExamplePair[]
  /** A one-line, plain-language explanation of how to decode this puzzle by hand. */
  describe(seed: number): string
}
