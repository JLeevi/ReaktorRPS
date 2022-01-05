import { Server } from 'http';
import WebSocket from 'ws';
import config from './config';
import gameCache from './cache/gameCache';
import liveResultService from './services/liveResultService';
import converters from './utils/games/converters';

const startWebSocket = (expressServer: Server) => {
  const liveResultClient = new WebSocket(config.WS_URL);
  const webSocketServer = new WebSocket.Server({
    server: expressServer,
    path: config.WS_HOST_PATH,
  });

  liveResultClient.on('message', (data) => {
    const parsedResult = liveResultService.handleLiveResult(data);
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedResult));
      }
    });
  });

  webSocketServer.on('connection', (socket) => {
    const games = gameCache.getLiveGames();
    const data = converters.convertInitToLiveEvent(games);
    socket.send(JSON.stringify(data));
  });

  return liveResultClient;
};

export default startWebSocket;
