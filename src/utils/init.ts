import axios from 'axios';
import gameCache from '../cache/gameCache';
import config from '../config';
import gameService from '../services/gameService';
import playerService from '../services/playerService';
import { HistoryPage } from '../types';
import converters from './games/converters';
import logger from './logger';

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

const fetchHistoryPage = async (pageUrl: string): Promise<HistoryPage | undefined> => {
  try {
    const { data }: {data: HistoryPage} = await axios.get(pageUrl);
    return data;
  } catch (error) {
    logger.error('Error fetching history page: \n', error);
    return undefined;
  }
};

/*
 Build up database from the external api pages when server is started up.
 Function recursively goes through the pages, saves the games
 to the DB and updates players' statistics.
*/
const initDatabaseCache = async (url?: string) => {
  if (!url) {
    await playerService.clearPlayerData();
    await gameService.clearGameData();
  }
  const pageUrl = url ?? config.HISTORY_URL;
  const data = await fetchHistoryPage(pageUrl);
  if (!data) {
    setTimeout(() => initDatabaseCache(url), 1000);
    return;
  }
  await saveHistoryPage(data);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    initDatabaseCache(nextUrl);
  } else {
    pushPlayerCacheToDb();
  }
};

export default {
  initDatabaseCache,
};
