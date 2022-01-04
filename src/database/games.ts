import PlayerGame from '../models/PlayerGame';
import {
  GameResult,
} from '../types';
import historyGameUtils from '../utils/games/historyGames';
import logger from '../utils/logger';

const clearGames = async () => {
  try {
    await PlayerGame.collection.drop();
  } catch (error) {
    logger.error('Error dropping PlayerGame collection:\n', error);
  }
};

const getGameSearchFilter = (playerName: string, cursor?: string) => {
  const playerFilter = {
    $or: [
      { playerAName: playerName },
      { playerBName: playerName },
    ],
  };
  const paginationFilter = { _id: { $lt: cursor } };
  const filter = cursor ? { ...playerFilter, ...paginationFilter } : playerFilter;
  return filter;
};

const getGamesForPlayer = async (playerName: string, cursor?: string) => {
  const PAGE_SIZE = 50;
  const filter = getGameSearchFilter(playerName, cursor);
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

const createManyGames = async (results: GameResult[]) => {
  const documents = results.map(historyGameUtils.convertResultToDbDocument);
  await PlayerGame.insertMany(documents);
};

const createGame = async (document: any) => {
  await PlayerGame.create(document);
};

export default {
  createGame,
  createManyGames,
  getGamesForPlayer,
  clearGames,
};
