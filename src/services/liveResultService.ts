import { RawData } from 'ws';
import gameCache from '../cache/gameCache';
import { GameBegin, GameResult } from '../types';
import converters from '../utils/games/converters';
import gameService from './gameService';

const handleLiveResult = (data: RawData) => {
  const event: GameBegin | GameResult = JSON.parse(JSON.parse(data.toString()));
  if (event.type === 'GAME_RESULT') {
    gameService.createGame(event);
    gameCache.removeLiveGame(event.gameId);
    return converters.convertResultToLiveEvent(event);
  }
  gameCache.addLiveGame(event);
  return converters.convertBeginToLiveEvent(event);
};

export default {
  handleLiveResult,
};
