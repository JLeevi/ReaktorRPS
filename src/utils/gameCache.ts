import {
  GameBegin, GameResult, LiveGame, PlayerStats,
} from '../types';
import cache from '../cache';
import constants from './constants';
import liveGameUtils from './liveGames';

const getPlayerStats = (playerName: string): PlayerStats => cache.get(`players/stats/${playerName}`)
  ?? constants.initialPlayerStats;

const setPlayerStats = (stats:any, playerName: string) => cache.set(`players/stats/${playerName}`, stats);

const getPlayerHistory = (playerName: string): GameResult[] => cache.get(`players/history/${playerName}`) ?? [];

const getPlayerList = (): string[] => cache.get('players') ?? [];

const addToPlayerList = (playerName: string) => {
  const currentList = getPlayerList();
  const updatedSet = new Set([...currentList, playerName]);
  const updatedPlayers = [...updatedSet];
  cache.set('players', updatedPlayers);
};

const getFullPlayerData = (playerName: string) => {
  const history = getPlayerHistory(playerName);
  const stats = getPlayerStats(playerName);
  return {
    name: playerName,
    history,
    stats,
  };
};

const addToPlayerHistory = (game: GameResult, playerName: string) => {
  const currentHistory = getPlayerHistory(playerName);
  const updatedHistory = [game, ...currentHistory];
  cache.set(`players/history/${playerName}`, updatedHistory);
};

const setPlayerHistory = (history: GameResult[], playerName: string) => {
  cache.set(`players/history/${playerName}`, history);
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

const getLiveGames = () => cache.get('liveGames') ?? [] as LiveGame[];

export default {
  getPlayerStats,
  setPlayerStats,
  getPlayerHistory,
  getPlayerList,
  addToPlayerList,
  setPlayerHistory,
  getFullPlayerData,
  addToPlayerHistory,
  addLiveGame,
  removeLiveGame,
  getLiveGames,
};
