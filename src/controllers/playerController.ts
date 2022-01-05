import playerService from '../services/playerService';
import errors from '../utils/errors';
import responses from '../utils/responses';

const getPlayerList = async () => {
  const players = await playerService.getPlayerList();
  return {
    players,
  };
};

const getPlayerData = async (playerName: string, cursor?: string) => {
  const data = await playerService.getPlayerGames(playerName, cursor);
  if (cursor) {
    return responses.returnSuccess(data);
  }
  const stats = await playerService.getPlayerStats(playerName);
  if (!stats) {
    const response = { error: errors.getFetchPlayerErrorMsg(playerName) };
    return responses.returnError(response);
  }
  return responses.returnSuccess({
    ...data,
    stats,
  });
};

export default {
  getPlayerList,
  getPlayerData,
};
