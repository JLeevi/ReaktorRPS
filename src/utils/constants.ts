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

const GAME_PAGE_SIZE = 50;

// Longest a game can exist before we check the historical results
// for a result (4mins in milliseconds)
const LIVE_GAME_TIMEOUT_MS = 4 * 60 * 1000;

export default {
  initialPlayerStats,
  GAME_PAGE_SIZE,
  LIVE_GAME_TIMEOUT_MS,
};
