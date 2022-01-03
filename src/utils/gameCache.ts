import {
  GameBegin, LiveGame, PlayerStats,
} from '../types';
import cache from '../cache';
import constants from './constants';
import liveGameUtils from './liveGames';

const getPlayerStats = (playerName: string): PlayerStats => cache.get(`players/stats/${playerName}`)
  ?? { ...constants.initialPlayerStats, name: playerName };

const setPlayerStats = (stats: PlayerStats, playerName: string) => cache.set(
  `players/stats/${playerName}`,
  { ...stats, name: playerName },
);

const getPlayerSet = (): Set<string> | null => cache.get('players');

const addToPlayerSet = (player: string) => {
  const currentPlayers = getPlayerSet() ?? new Set([]);
  const updatedSet = currentPlayers.add(player);
  cache.set('players', updatedSet);
};

const initPlayerSet = (players: string[]) => {
  const playerSet = new Set<string>(players);
  cache.set('players', playerSet);
};

const addLiveGame = (game: GameBegin) => {
  const prev: LiveGame[] = cache.get('liveGames') ?? [];
  const newGame = liveGameUtils.convertBeginToLiveGame(game);
  const updated = [...prev, newGame];
  cache.set('liveGames', updated);
};

const removeLiveGame = (gameId: string) => {
  const prev: LiveGame[] = cache.get('liveGames') ?? [];
  const updated = prev.filter((g) => g.gameId !== gameId);
  cache.set('liveGames', updated);
};

const getLiveGames = () => (cache.get('liveGames') ?? []) as LiveGame[];

export default {
  getPlayerStats,
  setPlayerStats,
  getPlayerSet,
  addToPlayerSet,
  initPlayerSet,
  addLiveGame,
  removeLiveGame,
  getLiveGames,
};
