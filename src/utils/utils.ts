import axios from 'axios';
import config from '../config';
import {
  GameOutcome, GameResult, HistoryPage, PlayerResult, PlayerStats, RelativeGameOutcome, Weapon,
} from '../types';
import gameCache from './gameCache';
import truthtables from './truthtables';

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

const sortPlayerHistory = (playerName: string) => {
  const history = gameCache.getPlayerHistory(playerName);
  const sortByTime = (a: GameResult, b: GameResult) => b.t - a.t;
  const sorted = history.sort(sortByTime);
  gameCache.setPlayerHistory(sorted, playerName);
};

const sortAllPlayersHistory = () => {
  const players = gameCache.getPlayerList();
  players.forEach(sortPlayerHistory);
};

const savePlayerStats = (player: PlayerResult, outcome: RelativeGameOutcome) => {
  const stats: PlayerStats = gameCache.getPlayerStats(player.name);
  const { played } = player;
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
  gameCache.setPlayerStats(newStats, player.name);
};

const saveGameResults = (result: GameResult) => {
  const outcome = getGameOutcome(result);
  const aOutcome = truthtables.relativeOutcomes.A[outcome];
  const bOutcome = truthtables.relativeOutcomes.B[outcome];
  const playerA = result.playerA.name;
  const playerB = result.playerB.name;
  gameCache.addToPlayerList(playerA);
  gameCache.addToPlayerHistory(result, playerA);
  if (playerA !== playerB) {
    gameCache.addToPlayerList(playerB);
    gameCache.addToPlayerHistory(result, playerB);
  }
  savePlayerStats(result.playerA, aOutcome);
  savePlayerStats(result.playerB, bOutcome);
};

const initPlayerData = async (url?: string) => {
  const pageUrl = url ?? config.HISTORY_URL;
  const { data }: {data: HistoryPage} = await axios.get(pageUrl);
  data.data.forEach(saveGameResults);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    initPlayerData(nextUrl);
  } else {
    console.log('LAST:\t', url);
    sortAllPlayersHistory();
  }
};

export default {
  getGameOutcome,
  initPlayerData,
  saveGameResults,
};
