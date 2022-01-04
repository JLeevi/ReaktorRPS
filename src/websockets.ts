import { Server } from 'http';
import WebSocket from 'ws';
import config from './config';
import gameService from './services/games';
import gameCache from './utils/gameCache';
import liveGames from './utils/liveGames';

const startWebSocket = (expressServer: Server) => {
  const liveResultClient = new WebSocket(config.WS_URL);
  const webSocketServer = new WebSocket.Server({
    server: expressServer,
    path: config.WS_HOST_PATH,
  });

  liveResultClient.on('message', (data) => {
    const parsedResult = gameService.handleLiveResult(data);
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedResult));
      }
    });
  });

  webSocketServer.on('connection', (socket) => {
    const games = gameCache.getLiveGames();
    const data = liveGames.convertInitToLiveEvent(games);
    socket.send(JSON.stringify(data));
  });

  // Keep liveResultClient alive on heroku by sending no-op's
  // once in 30 seconds

  const noop = () => {};

  const ping = () => {
    liveResultClient.ping(noop);
  };

  setInterval(ping, 30 * 1000);

  return liveResultClient;
};

export default startWebSocket;
