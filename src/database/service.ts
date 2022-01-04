import playersDb from './players';
import gamesDb from './games';
import historyGameUtils from '../utils/games/historyGames';
import errors from '../utils/errors';
import { GameResult } from '../types';
import logger from '../utils/logger';

const clearFullPlayerData = async () => {
  await playersDb.clearPlayers();
  await gamesDb.clearGames();
};

const getPlayerList = async () => playersDb.getPlayerList();

const getFullPlayerData = async (playerName: string) => {
  const { games, cursor } = await gamesDb.getGamesForPlayer(playerName);
  const stats = await playersDb.getPlayerStats(playerName);
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

const createGame = async (result: GameResult) => {
  const document = historyGameUtils.convertResultToDbDocument(result);
  try {
    await gamesDb.createGame(document);
    await playersDb.updatePlayerStats(document.playerA);
    await playersDb.updatePlayerStats(document.playerB);
  } catch (error) {
    logger.error('Error creating PlayerGame document:\n', error);
  }
};

const { getGamesForPlayer, createManyGames } = gamesDb;
const { createManyPlayers } = playersDb;

export default {
  clearFullPlayerData,
  createGame,
  createManyGames,
  createManyPlayers,
  getPlayerList,
  getGamesForPlayer,
  getFullPlayerData,
};
