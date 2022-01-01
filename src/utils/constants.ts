import { PlayerStats } from '../types';

const initialPlayerStats: Omit<Omit<PlayerStats, 'name'>, 'mostPlayed'> = {
  wins: 0,
  losses: 0,
  draws: 0,
  rocks: 0,
  papers: 0,
  scissors: 0,
  totalGames: 0,
  winRatio: 0,
  mostPlayedCount: 0,
};

export default {
  initialPlayerStats,
};
