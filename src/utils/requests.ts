import axios from 'axios';
import config from '../config';
import { GameResult, HistoryPage } from '../types';
import logger from './logger';

const fetchHistoryPage = async (pageUrl?: string): Promise<HistoryPage | undefined> => {
  const url = pageUrl ?? config.HISTORY_URL;
  try {
    const { data }: {data: HistoryPage} = await axios.get(url);
    return data;
  } catch (error) {
    logger.error('Error fetching history page: \n', error);
    return undefined;
  }
};

/*
    Tries finding a gameresult for the given game from historical page data.
    Tries from at most 3 first pages.
*/
const fetchGameResultFromHistory = async (gameId: string, pageTTL = 3):
  Promise<GameResult | undefined> => {
  if (pageTTL < 0) {
    return undefined;
  }
  const page = await fetchHistoryPage();
  if (page) {
    const results = page.data;
    const result = results.find((g) => g.gameId === gameId);
    if (!result) {
      return fetchGameResultFromHistory(gameId, pageTTL - 1);
    }
    return result;
  }
  return undefined;
};

export default {
  fetchHistoryPage,
  fetchGameResultFromHistory,
};
