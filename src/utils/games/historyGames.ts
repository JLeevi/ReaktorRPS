import {
  GameOutcome,
  GameResult,
  HistoryGame,
} from '../../types';
import truthtables from '../truthtables';
import databaseService from '../../database/service';
import playerDataUtils from './players';

const getGameOutcome = (result: GameResult): GameOutcome => {
  const weaponA = result.playerA.played;
  const weaponB = result.playerB.played;
  return truthtables.gameOutcomes[weaponA][weaponB];
};

const convertResultToHistoryGame = (result: GameResult): HistoryGame => {
  const outcome = getGameOutcome(result);
  const aOutcome = truthtables.relativeOutcomes.A[outcome];
  const bOutcome = truthtables.relativeOutcomes.B[outcome];
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

const generateGameDocumentId = (result: GameResult) => `${result.t.toString()}${result.gameId}`;

const convertResultToDbDocument = (result: GameResult) => {
  const game = convertResultToHistoryGame(result);
  const aName = result.playerA.name;
  const bName = result.playerB.name;
  const customId = generateGameDocumentId(result);
  return {
    _id: customId, playerAName: aName, playerBName: bName, ...game,
  };
};

const saveGameStats = (result: GameResult) => {
  const outcome = getGameOutcome(result);
  const aOutcome = truthtables.relativeOutcomes.A[outcome];
  const bOutcome = truthtables.relativeOutcomes.B[outcome];
  playerDataUtils.updatePlayerStatsToCache({ ...result.playerA, outcome: aOutcome });
  playerDataUtils.updatePlayerStatsToCache({ ...result.playerB, outcome: bOutcome });
};

const saveGameBatch = async (results: GameResult[]) => {
  results.forEach(saveGameStats);
  await databaseService.createManyGames(results);
};

export default {
  getGameOutcome,
  convertResultToDbDocument,
  saveGameBatch,
};
