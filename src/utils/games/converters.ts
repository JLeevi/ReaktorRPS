import {
  GameBegin, GameResult, HistoryGame, LiveEvent, LiveGame, LiveUpdate,
} from '../../types';
import gameUtils from './outcomes';
import dbUtils from '../database';

const convertResultToHistoryGame = (result: GameResult): HistoryGame => {
  const { aOutcome, bOutcome } = gameUtils.getGameOutcomes(result);
  return {
    ...result,
    playerA: {
      ...result.playerA,
      outcome: aOutcome,
    },
    playerB: {
      ...result.playerB,
      outcome: bOutcome,
    },
  };
};

const convertResultToDbDocument = (result: GameResult) => {
  const game = convertResultToHistoryGame(result);
  const aName = result.playerA.name;
  const bName = result.playerB.name;
  const customId = dbUtils.generateGameDocumentId(result);
  return {
    _id: customId, playerAName: aName, playerBName: bName, ...game,
  };
};

const convertBeginToLiveGame = (game: GameBegin): LiveGame => {
  const { gameId, playerA, playerB } = game;
  return {
    gameId,
    isFinished: false,
    playerA,
    playerB,
  };
};

const convertBeginToLiveEvent = (game: GameBegin): LiveUpdate => {
  const data = convertBeginToLiveGame(game);
  return {
    type: 'GAME_BEGIN',
    data,
  };
};

const convertResultToLiveEvent = (result: GameResult): LiveUpdate => {
  const { gameId, playerA, playerB } = result;
  const { aOutcome, bOutcome } = gameUtils.getGameOutcomes(result);
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
  convertInitToLiveEvent,
  convertResultToLiveEvent,
  convertResultToHistoryGame,
  convertResultToDbDocument,
};
