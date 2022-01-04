import { RawData } from 'ws';
import gameCache from '../cache/gameCache';
import databaseService from '../database/service';
import { GameBegin, GameResult } from '../types';
import liveGameUtils from '../utils/games/liveGames';

const getPlayerList = async () => {
  const cached = gameCache.getPlayerSet();
  if (cached) {
    return [...cached];
  }
  const players: string[] = await databaseService.getPlayerList();
  return players;
};

const getPlayerHistory = async (playerName: string, cursor?: string) => {
  if (cursor) {
    const data = await databaseService.getGamesForPlayer(playerName, cursor);
    return data;
  }
  // On first request, also send player's statistics
  const fullData = await databaseService.getFullPlayerData(playerName);
  return fullData;
};

const handleLiveResult = (data: RawData) => {
  const event: GameBegin | GameResult = JSON.parse(JSON.parse(data.toString()));
  if (event.type === 'GAME_RESULT') {
    databaseService.createGame(event);
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
