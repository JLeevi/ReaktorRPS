import { GameOutcome, RelativeGameOutcome, Weapon } from '../types';

// eslint-disable-next-line no-unused-vars
const gameOutcomes: {[keyA in Weapon]: {[keyB in Weapon]: GameOutcome}} = {
  ROCK: {
    ROCK: 'DRAW',
    PAPER: 'B',
    SCISSORS: 'A',
  },
  PAPER: {
    ROCK: 'B',
    PAPER: 'DRAW',
    SCISSORS: 'A',
  },
  SCISSORS: {
    ROCK: 'B',
    PAPER: 'A',
    SCISSORS: 'DRAW',
  },
};

// eslint-disable-next-line no-unused-vars
const relativeOutcomes: {[keyA in 'A' | 'B']: {[keyB in GameOutcome]: RelativeGameOutcome}} = {
  A: {
    A: 'WIN',
    B: 'LOSS',
    DRAW: 'DRAW',
  },
  B: {
    A: 'LOSS',
    B: 'WIN',
    DRAW: 'DRAW',
  },
};

export default {
  gameOutcomes,
  relativeOutcomes,
};
