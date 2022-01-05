import { GameOutcome, GameResult, RelativeGameOutcome } from '../../types';
import truthtables from '../truthtables';

const getGameOutcome = (result: GameResult): GameOutcome => {
  const weaponA = result.playerA.played;
  const weaponB = result.playerB.played;
  return truthtables.gameOutcomes[weaponA][weaponB];
};

const getRelativeOutcome = (result: GameResult, player: 'A' | 'B'): RelativeGameOutcome => {
  const outcome = getGameOutcome(result);
  return truthtables.relativeOutcomes[player][outcome];
};

const getGameOutcomes = (result: GameResult) => {
  const aOutcome = getRelativeOutcome(result, 'A');
  const bOutcome = getRelativeOutcome(result, 'B');
  return {
    aOutcome,
    bOutcome,
  };
};

export default {
  getGameOutcomes,
};
