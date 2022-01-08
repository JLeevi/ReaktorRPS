import gameCache from '../cache/gameCache';
import config from '../config';
import gameService from '../services/gameService';
import playerService from '../services/playerService';
import { HistoryPage } from '../types';
import converters from './games/converters';
import logger from './logger';
import requests from './requests';

const pushPlayerCacheToDb = () => {
  const cachedPlayers = [...gameCache.getPlayerSet() ?? []];
  const playerData = cachedPlayers.map(gameCache.getPlayerStats);
  playerService.createManyPlayers(playerData);
};

const saveHistoryPage = async (page: HistoryPage) => {
  const gameResults = page.data;
  await gameService.createManyGames(gameResults);
  const historyResults = gameResults.map(converters.convertResultToHistoryGame);
  historyResults.forEach((result) => {
    playerService.updatePlayerStatsToCache(result.playerA);
    playerService.updatePlayerStatsToCache(result.playerB);
  });
};

const syncPage = async (url: string): Promise<void> => {
  const data = await requests.fetchHistoryPage(url);
  if (!data) {
    return syncPage(url);
  }
  await saveHistoryPage(data);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    return syncPage(nextUrl);
  }
  return undefined;
};

const syncDb = async () => {
  await playerService.clearPlayers();
  await gameService.clearGames();
  await syncPage(config.HISTORY_URL);
  pushPlayerCacheToDb();
  logger.info('Database init finished');
};

export default {
  syncDb,
};
