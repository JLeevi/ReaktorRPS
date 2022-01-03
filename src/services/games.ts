import { RawData } from 'ws';
import gameCache from '../utils/gameCache';
import database from '../db';
import { GameBegin, GameResult } from '../types';
import liveGameUtils from '../utils/liveGames';

const getPlayerList = async () => {
  const cached = gameCache.getPlayerSet();
  if (cached) {
    return [...cached];
  }
  const players: string[] = await database.getPlayerList();
  return players;
};

const getPlayerHistory = async (playerName: string, cursor?: string) => {
  if (cursor) {
    const data = await database.getPlayerGames(playerName, cursor);
    return data;
  }
  // On first request, also send player's statistics
  const fullData = await database.getFullPlayerData(playerName);
  return fullData;
};

const handleLiveResult = (data: RawData) => {
  const event: GameBegin | GameResult = JSON.parse(JSON.parse(data.toString()));
  if (event.type === 'GAME_RESULT') {
    database.saveGameResults(event);
    gameCache.removeLiveGame(event.gameId);
    return liveGameUtils.convertResultToLiveEvent(event);
  }
  gameCache.addLiveGame(event);
  return liveGameUtils.convertBeginToLiveEvent(event);
};

export default {
  getPlayerList,
  getPlayerHistory,
  handleLiveResult,
};
