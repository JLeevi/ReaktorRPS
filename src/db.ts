import Player from './models/Player';
import PlayerGame from './models/PlayerGame';
import {
  GameResult, HistoryPlayerResult, PlayerStats,
} from './types';
import errors from './utils/errors';
import gameCache from './utils/gameCache';
import gameUtils from './utils/historyGames';
import logger from './utils/logger';

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
  const stats: PlayerStats = gameUtils.getUpdatedPlayerStats(playerResult);
  const { name } = playerResult;
  await Player.findOneAndUpdate({ name }, stats);
  gameCache.setPlayerStats(stats, name);
};

const saveGameResults = async (result: GameResult) => {
  const document = gameUtils.convertResultToDbDocument(result);
  try {
    await PlayerGame.create(document);
    await updatePlayerStats(document.playerA);
    await updatePlayerStats(document.playerB);
  } catch (error) {
    logger.error('Error creating PlayerGame document:\t', error);
  }
};

const saveGameBatch = async (results: GameResult[]) => {
  const documents = results.map(gameUtils.convertResultToDbDocument);
  await PlayerGame.insertMany(documents);
};

const clearPlayers = async () => {
  await Player.collection.drop();
};

const clearHistory = async () => {
  await PlayerGame.collection.drop();
};

const clearFullPlayerData = async () => {
  await clearPlayers();
  await clearHistory();
};

const initPlayerData = async (playerData: PlayerStats[]) => {
  await clearPlayers();
  try {
    await Player.insertMany(playerData);
  } catch (error) {
    logger.error('Error inserting Player documents:\t', error);
  }
};

const getGameFilter = (playerName: string, cursor?: string) => {
  const playerFilter = {
    $or: [
      { playerAName: playerName },
      { playerBName: playerName },
    ],
  };
  const filter = cursor ? { ...playerFilter, _id: { $lt: cursor } } : playerFilter;
  return filter;
};

const getPlayerGames = async (playerName: string, cursor?: string) => {
  const PAGE_SIZE = 50;
  const filter = getGameFilter(playerName, cursor);
  const games = await PlayerGame.find(filter).sort({ _id: -1 }).limit(PAGE_SIZE);
  const latestGameIdx = games.length - 1;
  if (latestGameIdx < 0) {
    return {
      games,
    };
  }
  const latestGame = games[latestGameIdx];
  const nextCursor: string = latestGame.id;
  return {
    games,
    cursor: nextCursor,
  };
};

const getPlayerStats = async (playerName: string) => {
  const stats = await Player.findOne({ name: playerName });
  return stats;
};

const getFullPlayerData = async (playerName: string) => {
  const { games, cursor } = await getPlayerGames(playerName);
  const stats = await getPlayerStats(playerName);
  if (!stats) {
    const error = errors.getFetchPlayerErrorMsg(playerName);
    return { error, success: false };
  }
  return {
    games,
    cursor,
    stats,
    success: true,
  };
};

export default {
  saveGameResults,
  saveGameBatch,
  clearFullPlayerData,
  initPlayerData,
  getPlayerGames,
  getFullPlayerData,
  getPlayerList,
};
