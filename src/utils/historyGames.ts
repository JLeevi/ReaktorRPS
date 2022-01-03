import axios from 'axios';
import config from '../config';
import {
  GameOutcome,
  GameResult,
  HistoryGame,
  HistoryPage,
  HistoryPlayerResult,
  PlayerStats,
  RelativeGameOutcome,
  Weapon,
} from '../types';
import gameCache from './gameCache';
import truthtables from './truthtables';
import database from '../db';

const getGameOutcome = (result: GameResult): GameOutcome => {
  const weaponA = result.playerA.played;
  const weaponB = result.playerB.played;
  return truthtables.gameOutcomes[weaponA][weaponB];
};

const getMostPlayedHand = (rocks: number, papers: number, scissors:number): [Weapon, number] => {
  const maxVal = Math.max(rocks, papers, scissors);
  if (rocks === maxVal) return ['ROCK', rocks];
  if (papers === maxVal) return ['PAPER', papers];
  return ['SCISSORS', scissors];
};

const getUpdatedResultCounts = (stats: PlayerStats, outcome: RelativeGameOutcome) => {
  const { wins, losses, draws } = stats;
  const updatedWins = outcome === 'WIN' ? wins + 1 : wins;
  const updatedDraws = outcome === 'DRAW' ? draws + 1 : draws;
  const updatedLosses = outcome === 'LOSS' ? losses + 1 : losses;
  return [updatedWins, updatedDraws, updatedLosses];
};

const getUpdatedHandCounts = (stats: PlayerStats, played: Weapon) => {
  const { rocks, papers, scissors } = stats;
  const updatedRocks = played === 'ROCK' ? rocks + 1 : rocks;
  const updatedPapers = played === 'PAPER' ? papers + 1 : papers;
  const updatedScissors = played === 'SCISSORS' ? scissors + 1 : scissors;
  return [updatedRocks, updatedPapers, updatedScissors];
};

const getUpdatedPlayerStats = (player: HistoryPlayerResult) => {
  const { name, outcome, played } = player;
  const stats: PlayerStats = gameCache.getPlayerStats(name);
  const [wins, losses, draws] = getUpdatedResultCounts(stats, outcome);
  const [rocks, papers, scissors] = getUpdatedHandCounts(stats, played);
  const [mostPlayed, mostPlayedCount] = getMostPlayedHand(rocks, papers, scissors);
  const totalGames = stats.totalGames + 1;
  const newStats: PlayerStats = {
    ...stats,
    totalGames,
    wins,
    losses,
    draws,
    winRatio: wins / totalGames,
    rocks,
    papers,
    scissors,
    mostPlayed,
    mostPlayedCount,
  };
  return newStats;
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

const updatePlayerStats = (playerResult: HistoryPlayerResult) => {
  gameCache.addToPlayerSet(playerResult.name);
  const stats: PlayerStats = getUpdatedPlayerStats(playerResult);
  const { name } = playerResult;
  gameCache.setPlayerStats(stats, name);
};

const pushPlayerDataToDb = () => {
  const playerSet = gameCache.getPlayerSet() ?? new Set([]);
  const playerNames = [...playerSet];
  const playerData = playerNames.map(gameCache.getPlayerStats);
  database.initPlayerData(playerData);
};

const saveGameStats = (result: GameResult) => {
  const outcome = getGameOutcome(result);
  const aOutcome = truthtables.relativeOutcomes.A[outcome];
  const bOutcome = truthtables.relativeOutcomes.B[outcome];
  updatePlayerStats({ ...result.playerA, outcome: aOutcome });
  updatePlayerStats({ ...result.playerB, outcome: bOutcome });
};

const saveGameBatch = async (results: GameResult[]) => {
  results.forEach(saveGameStats);
  await database.saveGameBatch(results);
};

const initPlayerData = async (url?: string) => {
  if (!url) {
    await database.clearFullPlayerData();
  }
  const pageUrl = url ?? config.HISTORY_URL;
  const { data }: {data: HistoryPage} = await axios.get(pageUrl);
  await saveGameBatch(data.data);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    initPlayerData(nextUrl);
  } else {
    pushPlayerDataToDb();
  }
};

export default {
  getGameOutcome,
  initPlayerData,
  convertResultToDbDocument,
  getUpdatedPlayerStats,
};
