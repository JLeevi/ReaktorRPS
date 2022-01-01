import {
  GameBegin, GameResult, LiveEvent, LiveGame,
} from '../types';
import utils from './utils';
import truthtables from './truthtables';

const convertBeginToLiveGame = (game: GameBegin): LiveGame => {
  const { gameId, playerA, playerB } = game;
  return {
    gameId,
    isFinished: false,
    playerA,
    playerB,
  };
};

const convertBeginToLiveEvent = (game: GameBegin): LiveEvent => {
  const data = convertBeginToLiveGame(game);
  return {
    type: 'GAME_BEGIN',
    data,
  };
};

const convertResultToLiveEvent = (game: GameResult): LiveEvent => {
  const { gameId, playerA, playerB } = game;
  const outcome = utils.getGameOutcome(game);
  const aOutcome = truthtables.relativeOutcomes.A[outcome];
  const bOutcome = truthtables.relativeOutcomes.B[outcome];
  const liveGame: LiveGame = {
    gameId,
    isFinished: true,
    playerA: {
      ...playerA,
      outcome: aOutcome,
    },
    playerB: {
      ...playerB,
      outcome: bOutcome,
    },
  };
  return {
    type: 'GAME_RESULT',
    data: liveGame,
  };
};

const convertInitToLiveEvent = (games: LiveGame[]): LiveEvent => ({
  type: 'INIT',
  data: games,
});

export default {
  convertBeginToLiveGame,
  convertBeginToLiveEvent,
  convertResultToLiveEvent,
  convertInitToLiveEvent,
};
