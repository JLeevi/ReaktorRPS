import Player from '../models/Player';
import {
  HistoryPlayerResult, PlayerStats,
} from '../types';
import gameCache from '../cache/gameCache';
import playerUtils from '../utils/games/players';
import logger from '../utils/logger';

const getPlayerList = async () => {
  const cached = gameCache.getPlayerSet();
  if (cached) {
    const players = [...cached];
    return players;
  }
  const playerDocs = await Player.find({});
  const players: string[] = playerDocs.map((p) => (p.name));
  gameCache.initPlayerSet(players);
  return players;
};

const updatePlayerStats = async (playerResult: HistoryPlayerResult) => {
  const stats: PlayerStats = playerUtils.getUpdatedPlayerStats(playerResult);
  const { name } = playerResult;
  await Player.findOneAndUpdate({ name }, stats);
  gameCache.setPlayerStats(stats, name);
};

const clearPlayers = async () => {
  try {
    await Player.collection.drop();
  } catch (error) {
    logger.error('Error dropping Player collection:\n', error);
  }
};

const createManyPlayers = async (playerData: PlayerStats[]) => {
  try {
    await Player.insertMany(playerData);
  } catch (error) {
    logger.error('Error inserting Player documents:\n', error);
  }
};

const getPlayerStats = async (playerName: string) => {
  const stats = await Player.findOne({ name: playerName });
  return stats;
};

export default {
  clearPlayers,
  createManyPlayers,
  getPlayerList,
  updatePlayerStats,
  getPlayerStats,
};
