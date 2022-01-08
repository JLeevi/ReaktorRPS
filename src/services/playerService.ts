import gameCache from '../cache/gameCache';
import Player from '../models/Player';
import PlayerGame from '../models/PlayerGame';
import { HistoryPlayerResult, PlayerStats } from '../types';
import constants from '../utils/constants';
import filters from '../utils/database';
import playerUtils from '../utils/games/players';

const getPlayerList = async () => {
  const cachedSet = gameCache.getPlayerSet();
  if (cachedSet) {
    return [...cachedSet];
  }
  const docs = await Player.find({});
  const players: string[] = docs.map((p) => (p.name));
  gameCache.initPlayerSet(players);
  return players;
};

const getPlayerGames = async (playerName: string, cursor?: string) => {
  const filter = filters.getGameSearchFilter(playerName, cursor);
  const games = await PlayerGame.find(filter).sort({ _id: -1 }).limit(constants.GAME_PAGE_SIZE);
  const nextCursor = filters.getNextCursor(games);
  return {
    games,
    cursor: nextCursor,
  };
};

const getPlayerStats = async (name: string) => {
  const stats = await Player.findOne({ name });
  return stats;
};

const updatePlayerStatsToCache = (result: HistoryPlayerResult) => {
  const stats: PlayerStats = playerUtils.getUpdatedPlayerStats(result);
  const { name } = result;
  gameCache.addToPlayerSet(name);
  gameCache.setPlayerStats(stats, name);
  return stats;
};

const updatePlayerStats = async (result: HistoryPlayerResult) => {
  const stats = updatePlayerStatsToCache(result);
  await Player.findOneAndUpdate({ name: result.name }, stats);
};

const createManyPlayers = async (players: PlayerStats[]) => {
  await Player.insertMany(players);
};

const clearPlayers = async () => {
  await Player.collection.drop();
};

export default {
  getPlayerList,
  getPlayerGames,
  getPlayerStats,
  updatePlayerStatsToCache,
  updatePlayerStats,
  createManyPlayers,
  clearPlayers,
};
