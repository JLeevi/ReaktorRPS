import PlayerGame from '../models/PlayerGame';
import { GameResult } from '../types';
import converters from '../utils/games/converters';
import logger from '../utils/logger';
import playerService from './playerService';

const createGame = async (result: GameResult) => {
  const document = converters.convertResultToDbDocument(result);
  try {
    await PlayerGame.create(document);
    await playerService.updatePlayerStats(document.playerA);
    await playerService.updatePlayerStats(document.playerB);
  } catch (error) {
    logger.error('Error creating PlayerGame document:\n', error);
  }
};

const createManyGames = async (gameResults: GameResult[]) => {
  try {
    const documents = gameResults.map(converters.convertResultToDbDocument);
    await PlayerGame.insertMany(documents, { ordered: false });
  } catch (error) {
    logger.error('Error in PlayerGame.insertMany:\n', error);
  }
};

const clearGames = async () => {
  await PlayerGame.collection.drop();
};

export default {
  createGame,
  createManyGames,
  clearGames,
};
