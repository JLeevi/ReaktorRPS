import axios from 'axios';
import config from '../config';
import databaseService from '../database/service';
import { HistoryPage } from '../types';
import historyGameUtils from './games/historyGames';
import players from './games/players';

const initDatabaseCache = async (url?: string) => {
  if (!url) {
    await databaseService.clearFullPlayerData();
  }
  const pageUrl = url ?? config.HISTORY_URL;
  const { data }: {data: HistoryPage} = await axios.get(pageUrl);
  await historyGameUtils.saveGameBatch(data.data);
  const { cursor } = data;
  const nextUrl = `${config.API_URL}${cursor}`;
  if (cursor) {
    initDatabaseCache(nextUrl);
  } else {
    players.pushPlayerCacheToDb();
  }
};

export default {
  initDatabaseCache,
};
