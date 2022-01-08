import { RawData } from 'ws';
import gameCache from '../cache/gameCache';
import {
  GameBegin, GameResult, LiveUpdate, SendWSUpdate,
} from '../types';
import constants from '../utils/constants';
import converters from '../utils/games/converters';
import requests from '../utils/requests';
import gameService from './gameService';

const saveEventData = (event: GameBegin | GameResult) => {
  if (event.type === 'GAME_BEGIN') {
    gameCache.addLiveGame(event);
  } else {
    gameService.createGame(event);
    gameCache.removeLiveGame(event.gameId);
  }
};

const isGameUnfinished = (gameId: string) => {
  const currentLiveGames = gameCache.getLiveGames();
  const isUnfinished = currentLiveGames.find((g) => g.gameId === gameId);
  return isUnfinished !== undefined;
};

const handleLiveGameTimeout = async (gameId: string, sendWSUpdate: SendWSUpdate) => {
  const isUnfinished = isGameUnfinished(gameId);
  if (isUnfinished) {
    const gameResult = await requests.fetchGameResultFromHistory(gameId);
    if (gameResult) {
      saveEventData(gameResult);
      const liveEvent = converters.convertResultToLiveEvent(gameResult);
      sendWSUpdate(liveEvent);
    }
  }
};

/*
  Checks whether the given game is still unfinished after LIVE_GAME_TIMEOUT_MS has passed.
  If so, check whether history API contains the missing GameResult.
  This is necessary since the /rps/live api misses to send events once in a while.
*/
const addLiveGameTimeout = (gameId: string, sendUpdate: SendWSUpdate) => {
  const handleTimeout = () => handleLiveGameTimeout(gameId, sendUpdate);
  setTimeout(handleTimeout, constants.LIVE_GAME_TIMEOUT_MS);
};

const parseLiveResult = (data: RawData): LiveUpdate => {
  const event: GameBegin | GameResult = JSON.parse(JSON.parse(data.toString()));
  saveEventData(event);
  if (event.type === 'GAME_BEGIN') {
    return converters.convertBeginToLiveEvent(event);
  }
  return converters.convertResultToLiveEvent(event);
};

export default {
  parseLiveResult,
  addLiveGameTimeout,
};
