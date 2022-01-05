import {
  HistoryPlayerResult, PlayerStats, RelativeGameOutcome, Weapon,
} from '../../types';
import gameCache from '../../cache/gameCache';

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

export default {
  getUpdatedPlayerStats,
};
