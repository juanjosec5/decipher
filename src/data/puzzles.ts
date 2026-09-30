import type { PuzzleSeed } from '@/types'

/**
 * Static, hand-authored puzzle list. Selection is date-based (see
 * `engine/puzzleSelector.ts`), so this array's ORDER is the day-to-day
 * sequence — keep cipher types from repeating back-to-back.
 *
 * Entries come in groups of 4 (one of each cipher type) — one group is one
 * day's test. Difficulty is uniform within a group and cycles easy / medium /
 * hard every three days. 30 groups = 30 days before the schedule repeats.
 *
 * `plaintext` is always a full phrase, never a single word. Ciphertext and
 * key are derived at runtime from `id` — never hand-write ciphertext here.
 */
export const puzzles: PuzzleSeed[] = [
  // Day 1 — easy
  { id: 1, cipherType: 'caesar', difficulty: 'easy', plaintext: 'HONESTY IS THE BEST POLICY' },
  { id: 2, cipherType: 'morse', difficulty: 'easy', plaintext: 'KNOWLEDGE IS POWER' },
  { id: 3, cipherType: 'substitution', difficulty: 'easy', plaintext: 'LESS IS MORE' },
  { id: 4, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'TIME IS PRECIOUS' },
  // Day 2 — medium
  { id: 5, cipherType: 'caesar', difficulty: 'medium', plaintext: 'ACTIONS SPEAK LOUDER THAN WORDS' },
  { id: 6, cipherType: 'morse', difficulty: 'medium', plaintext: 'GOOD THINGS TAKE TIME' },
  { id: 7, cipherType: 'substitution', difficulty: 'medium', plaintext: 'EVERY CLOUD HAS A SILVER LINING' },
  { id: 8, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'CURIOSITY DID NOT KILL THE CAT' },
  // Day 3 — hard
  { id: 9, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THOSE WHO DO NOT MOVE DO NOT NOTICE THEIR CHAINS' },
  { id: 10, cipherType: 'morse', difficulty: 'hard', plaintext: 'PATIENCE IS A BITTER PLANT WITH A SWEET FRUIT' },
  { id: 11, cipherType: 'substitution', difficulty: 'hard', plaintext: 'THE OBSTACLE IN THE PATH BECOMES THE PATH' },
  { id: 12, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'WHAT WE THINK WE BECOME OVER TIME' },
  // Day 4 — easy
  { id: 13, cipherType: 'caesar', difficulty: 'easy', plaintext: 'PRACTICE MAKES PERFECT' },
  { id: 14, cipherType: 'morse', difficulty: 'easy', plaintext: 'SLOW AND STEADY WINS' },
  { id: 15, cipherType: 'substitution', difficulty: 'easy', plaintext: 'SIMPLICITY IS UNDERRATED' },
  { id: 16, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'FORTUNE FAVORS THE BOLD' },
  // Day 5 — medium
  { id: 17, cipherType: 'caesar', difficulty: 'medium', plaintext: 'THE PEN IS MIGHTIER THAN THE SWORD' },
  { id: 18, cipherType: 'morse', difficulty: 'medium', plaintext: 'SILENCE IS SOMETIMES THE BEST ANSWER' },
  { id: 19, cipherType: 'substitution', difficulty: 'medium', plaintext: 'A SMOOTH SEA NEVER MADE A SKILLED SAILOR' },
  { id: 20, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'FORTUNE REWARDS PREPARATION AND NERVE' },
  // Day 6 — hard
  { id: 21, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE ONLY WAY OUT OF THE LABYRINTH IS THROUGH' },
  { id: 22, cipherType: 'morse', difficulty: 'hard', plaintext: 'THE MAP IS NOT THE SAME AS THE TERRITORY' },
  { id: 23, cipherType: 'substitution', difficulty: 'hard', plaintext: 'A JOURNEY OF A THOUSAND MILES BEGINS WITH A SINGLE STEP' },
  { id: 24, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'WE SUFFER MORE IN IMAGINATION THAN IN REALITY' },
  // Day 7 — easy
  { id: 25, cipherType: 'caesar', difficulty: 'easy', plaintext: 'ACTIONS HAVE CONSEQUENCES' },
  { id: 26, cipherType: 'morse', difficulty: 'easy', plaintext: 'EARLY BIRDS CATCH WORMS' },
  { id: 27, cipherType: 'substitution', difficulty: 'easy', plaintext: 'SMALL STEPS WIN RACES' },
  { id: 28, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'KINDNESS COSTS NOTHING' },
  // Day 8 — medium
  { id: 29, cipherType: 'caesar', difficulty: 'medium', plaintext: 'GREAT OAKS GROW FROM LITTLE ACORNS' },
  { id: 30, cipherType: 'morse', difficulty: 'medium', plaintext: 'A WATCHED POT NEVER BOILS OVER' },
  { id: 31, cipherType: 'substitution', difficulty: 'medium', plaintext: 'MANY HANDS MAKE LIGHT WORK' },
  { id: 32, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'DO NOT COUNT YOUR CHICKENS EARLY' },
  // Day 9 — hard
  { id: 33, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE BEST TIME TO PLANT A TREE WAS TWENTY YEARS AGO' },
  { id: 34, cipherType: 'morse', difficulty: 'hard', plaintext: 'FALL DOWN SEVEN TIMES AND STAND UP EIGHT' },
  { id: 35, cipherType: 'substitution', difficulty: 'hard', plaintext: 'THE LONGEST JOURNEYS ALWAYS BEGIN WITH A SINGLE STEP' },
  { id: 36, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'WHAT DOES NOT DESTROY YOU MAKES YOU STRONGER' },
  // Day 10 — easy
  { id: 37, cipherType: 'caesar', difficulty: 'easy', plaintext: 'LAUGHTER IS GOOD MEDICINE' },
  { id: 38, cipherType: 'morse', difficulty: 'easy', plaintext: 'SILENCE IS GOLDEN' },
  { id: 39, cipherType: 'substitution', difficulty: 'easy', plaintext: 'PATIENCE IS A VIRTUE' },
  { id: 40, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'HARD WORK PAYS OFF' },
  // Day 11 — medium
  { id: 41, cipherType: 'caesar', difficulty: 'medium', plaintext: 'THE GRASS IS GREENER WITH CARE' },
  { id: 42, cipherType: 'morse', difficulty: 'medium', plaintext: 'ACTIONS TODAY SHAPE TOMORROW' },
  { id: 43, cipherType: 'substitution', difficulty: 'medium', plaintext: 'A CHAIN IS AS STRONG AS ITS WEAKEST LINK' },
  { id: 44, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'CURIOSITY LEADS TO GREAT DISCOVERY' },
  // Day 12 — hard
  { id: 45, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE FASTEST WAY THROUGH TROUBLE IS STRAIGHT AHEAD' },
  { id: 46, cipherType: 'morse', difficulty: 'hard', plaintext: 'A SMOOTH ROAD NEVER MADE A SKILLFUL DRIVER' },
  { id: 47, cipherType: 'substitution', difficulty: 'hard', plaintext: 'THOSE WHO DREAM BY DAY SEE THINGS OTHERS MISS' },
  { id: 48, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'MINDS THAT EXPLORE IDEAS GROW FASTER THAN MINDS THAT GOSSIP' },
  // Day 13 — easy
  { id: 49, cipherType: 'caesar', difficulty: 'easy', plaintext: 'TRUST BUT VERIFY' },
  { id: 50, cipherType: 'morse', difficulty: 'easy', plaintext: 'WASTE NOT WANT NOT' },
  { id: 51, cipherType: 'substitution', difficulty: 'easy', plaintext: 'LOOK BEFORE YOU LEAP' },
  { id: 52, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'BETTER LATE THAN NEVER' },
  // Day 14 — medium
  { id: 53, cipherType: 'caesar', difficulty: 'medium', plaintext: 'WHAT GOES AROUND COMES AROUND' },
  { id: 54, cipherType: 'morse', difficulty: 'medium', plaintext: 'NEVER JUDGE SOMEONE BY FIRST GLANCE' },
  { id: 55, cipherType: 'substitution', difficulty: 'medium', plaintext: 'A PENNY SAVED IS A PENNY EARNED' },
  { id: 56, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'WISDOM COMES FROM MANY MISTAKES' },
  // Day 15 — hard
  { id: 57, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE ONLY REAL MISTAKE IS THE ONE YOU NEVER LEARN FROM' },
  { id: 58, cipherType: 'morse', difficulty: 'hard', plaintext: 'WE CANNOT DIRECT THE WIND BUT WE CAN ADJUST OUR SAILS' },
  { id: 59, cipherType: 'substitution', difficulty: 'hard', plaintext: 'A CANDLE LOSES NOTHING BY LIGHTING ANOTHER CANDLE' },
  { id: 60, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'THE ROOTS OF EDUCATION ARE BITTER BUT THE FRUIT IS SWEET' },
  // Day 16 — easy
  { id: 61, cipherType: 'caesar', difficulty: 'easy', plaintext: 'ACTIONS SPEAK LOUDEST' },
  { id: 62, cipherType: 'morse', difficulty: 'easy', plaintext: 'EVERY CLOUD HAS SILVER' },
  { id: 63, cipherType: 'substitution', difficulty: 'easy', plaintext: 'HOME IS WHERE THE HEART IS' },
  { id: 64, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'TIME HEALS ALL WOUNDS' },
  // Day 17 — medium
  { id: 65, cipherType: 'caesar', difficulty: 'medium', plaintext: 'THE EARLY EFFORT WINS THE RACE' },
  { id: 66, cipherType: 'morse', difficulty: 'medium', plaintext: 'HONEST WORDS BUILD LASTING TRUST' },
  { id: 67, cipherType: 'substitution', difficulty: 'medium', plaintext: 'STEADY HABITS SHAPE A GOOD LIFE' },
  { id: 68, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'SMALL KINDNESS CAN CHANGE A DAY' },
  // Day 18 — hard
  { id: 69, cipherType: 'caesar', difficulty: 'hard', plaintext: 'NOT EVERYTHING THAT COUNTS CAN ACTUALLY BE COUNTED' },
  { id: 70, cipherType: 'morse', difficulty: 'hard', plaintext: 'A RIVER CUTS THROUGH ROCK NOT BY FORCE BUT BY PERSISTENCE' },
  { id: 71, cipherType: 'substitution', difficulty: 'hard', plaintext: 'THE MAN WHO MOVES A MOUNTAIN BEGINS BY CARRYING SMALL STONES' },
  { id: 72, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'WHEREVER YOU DECIDE TO GO GO THERE WITH ALL YOUR HEART' },
  // Day 19 — easy
  { id: 73, cipherType: 'caesar', difficulty: 'easy', plaintext: 'KNOWLEDGE IS A TREASURE' },
  { id: 74, cipherType: 'morse', difficulty: 'easy', plaintext: 'TWO WRONGS MAKE NO RIGHT' },
  { id: 75, cipherType: 'substitution', difficulty: 'easy', plaintext: 'BIRDS OF A FEATHER FLOCK' },
  { id: 76, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'DO NOT JUDGE TOO QUICKLY' },
  // Day 20 — medium
  { id: 77, cipherType: 'caesar', difficulty: 'medium', plaintext: 'PREPARATION OPENS THE DOOR TO LUCK' },
  { id: 78, cipherType: 'morse', difficulty: 'medium', plaintext: 'CLEAR GOALS MAKE HARD WORK EASIER' },
  { id: 79, cipherType: 'substitution', difficulty: 'medium', plaintext: 'NOTHING WORTH HAVING COMES EASY' },
  { id: 80, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'ROUGH SEAS TEACH THE BEST SAILORS' },
  // Day 21 — hard
  { id: 81, cipherType: 'caesar', difficulty: 'hard', plaintext: 'GROWTH OFTEN BEGINS AT THE EXACT PLACE THAT HURT THE MOST' },
  { id: 82, cipherType: 'morse', difficulty: 'hard', plaintext: 'YESTERDAY IS GONE TOMORROW IS UNKNOWN TODAY IS ENOUGH' },
  { id: 83, cipherType: 'substitution', difficulty: 'hard', plaintext: 'A PESSIMIST FINDS TROUBLE IN EVERY CHANCE THAT COMES' },
  { id: 84, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'AN OPTIMIST FINDS A CHANCE IN EVERY TROUBLE THAT COMES' },
  // Day 22 — easy
  { id: 85, cipherType: 'caesar', difficulty: 'easy', plaintext: 'PRACTICE BUILDS CONFIDENCE' },
  { id: 86, cipherType: 'morse', difficulty: 'easy', plaintext: 'TINY CHANGES ADD UP' },
  { id: 87, cipherType: 'substitution', difficulty: 'easy', plaintext: 'STAY CURIOUS AND KIND' },
  { id: 88, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'GOOD HABITS TAKE TIME' },
  // Day 23 — medium
  { id: 89, cipherType: 'caesar', difficulty: 'medium', plaintext: 'GOOD FRIENDS MAKE HARD TIMES EASIER' },
  { id: 90, cipherType: 'morse', difficulty: 'medium', plaintext: 'TRUE COURAGE MEANS ACTING AFRAID' },
  { id: 91, cipherType: 'substitution', difficulty: 'medium', plaintext: 'LISTEN TWICE BEFORE YOU SPEAK ONCE' },
  { id: 92, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'SMALL LEAKS CAN SINK A GREAT SHIP' },
  // Day 24 — hard
  { id: 93, cipherType: 'caesar', difficulty: 'hard', plaintext: 'THE FUTURE OFTEN BELONGS TO THOSE WHO KEEP BELIEVING' },
  { id: 94, cipherType: 'morse', difficulty: 'hard', plaintext: 'IT MATTERS NOT HOW SLOWLY YOU GO AS LONG AS YOU NEVER STOP' },
  { id: 95, cipherType: 'substitution', difficulty: 'hard', plaintext: 'WHAT LIES BEHIND US MATTERS LESS THAN WHAT LIES AHEAD' },
  { id: 96, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'THE MIND SHAPES REALITY MORE THAN WE REALIZE' },
  // Day 25 — easy
  { id: 97, cipherType: 'caesar', difficulty: 'easy', plaintext: 'CALM MINDS THINK CLEARLY' },
  { id: 98, cipherType: 'morse', difficulty: 'easy', plaintext: 'SHARE WHAT YOU LEARN' },
  { id: 99, cipherType: 'substitution', difficulty: 'easy', plaintext: 'EVERY EXPERT WAS A BEGINNER' },
  { id: 100, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'SIMPLE PLANS WORK BEST' },
  // Day 26 — medium
  { id: 101, cipherType: 'caesar', difficulty: 'medium', plaintext: 'EVERY MASTER WAS ONCE A STUDENT' },
  { id: 102, cipherType: 'morse', difficulty: 'medium', plaintext: 'HONESTY BUILDS BRIDGES OF TRUST' },
  { id: 103, cipherType: 'substitution', difficulty: 'medium', plaintext: 'PATIENCE TURNS MULBERRY LEAVES TO SILK' },
  { id: 104, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'A GOAL WITHOUT A PLAN IS JUST A WISH' },
  // Day 27 — hard
  { id: 105, cipherType: 'caesar', difficulty: 'hard', plaintext: 'AN INVESTMENT IN KNOWLEDGE ALWAYS PAYS THE BEST INTEREST' },
  { id: 106, cipherType: 'morse', difficulty: 'hard', plaintext: 'IT IS IN OUR DARKEST MOMENTS THAT WE MOST NEED TO FOCUS' },
  { id: 107, cipherType: 'substitution', difficulty: 'hard', plaintext: 'TEACH SOMEONE AND THE LESSON WILL OUTLAST YOU BOTH' },
  { id: 108, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'GREAT WORK ALWAYS BEGINS WITH GENUINE LOVE FOR IT' },
  // Day 28 — easy
  { id: 109, cipherType: 'caesar', difficulty: 'easy', plaintext: 'STAY TRUE TO YOURSELF' },
  { id: 110, cipherType: 'morse', difficulty: 'easy', plaintext: 'LITTLE THINGS MATTER MOST' },
  { id: 111, cipherType: 'substitution', difficulty: 'easy', plaintext: 'READ SOMETHING NEW TODAY' },
  { id: 112, cipherType: 'numericSymbol', difficulty: 'easy', plaintext: 'KEEP YOUR PROMISES ALWAYS' },
  // Day 29 — medium
  { id: 113, cipherType: 'caesar', difficulty: 'medium', plaintext: 'GREAT THINGS TAKE TIME TO BUILD' },
  { id: 114, cipherType: 'morse', difficulty: 'medium', plaintext: 'QUIET CONFIDENCE SPEAKS THE LOUDEST' },
  { id: 115, cipherType: 'substitution', difficulty: 'medium', plaintext: 'TEAMWORK MAKES DIFFICULT THINGS POSSIBLE' },
  { id: 116, cipherType: 'numericSymbol', difficulty: 'medium', plaintext: 'LEARNING NEVER TRULY LEAVES A PERSON' },
  // Day 30 — hard
  { id: 117, cipherType: 'caesar', difficulty: 'hard', plaintext: 'BELIEVING YOU CAN SUCCEED IS OFTEN HALF THE BATTLE' },
  { id: 118, cipherType: 'morse', difficulty: 'hard', plaintext: 'EVERY SETBACK CARRIES THE SEED OF AN EQUAL BENEFIT' },
  { id: 119, cipherType: 'substitution', difficulty: 'hard', plaintext: 'COURAGE IS WHAT IT TAKES TO STAND UP AND SPEAK' },
  { id: 120, cipherType: 'numericSymbol', difficulty: 'hard', plaintext: 'THE SECRET OF GETTING AHEAD IS GETTING STARTED TODAY' },
]
