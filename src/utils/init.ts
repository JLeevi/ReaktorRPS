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
  const { data }: {data: HistoryPage} = await axios.get(pageUrl);
  await saveHistoryPage(data);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    try {
      initDatabaseCache(nextUrl);
    } catch (error) {
      logger.error('Error in initDatabaseCache:\n', error);
      initDatabaseCache(nextUrl);
    }
  } else {
    pushPlayerCacheToDb();
  }
};

export default {
  initDatabaseCache,
};
