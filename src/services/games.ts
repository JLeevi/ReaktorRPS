import { RawData } from 'ws';
import gameCache from '../utils/gameCache';
import utils from '../utils/utils';
import { GameBegin, GameResult } from '../types';
import liveGameUtils from '../utils/liveGames';

const { getPlayerList } = gameCache;

const getFullPlayerData = (playerName: string) => {
  const cachedData = gameCache.getFullPlayerData(playerName);
  return cachedData ?? {
    error: 'Player not found',
  };
};

const handleLiveResult = (data: RawData) => {
  const event: GameBegin | GameResult = JSON.parse(JSON.parse(data.toString()));
  if (event.type === 'GAME_RESULT') {
    utils.saveGameResults(event);
    gameCache.removeLiveGame(event.gameId);
    return liveGameUtils.convertResultToLiveEvent(event);
  }
  gameCache.addLiveGame(event);
  return liveGameUtils.convertBeginToLiveEvent(event);
};

export default {
  getPlayerList,
  getFullPlayerData,
  handleLiveResult,
};
