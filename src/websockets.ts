import { Server } from 'http';
import WebSocket from 'ws';
import config from './config';
import gameCache from './cache/gameCache';
import liveResultService from './services/liveResultService';
import converters from './utils/games/converters';
import logger from './utils/logger';

const startWebSocket = (expressServer: Server) => {
  const liveResultClient = new WebSocket(config.WS_URL);
  const webSocketServer = new WebSocket.Server({
    server: expressServer,
    path: config.WS_HOST_PATH,
  });

  const restartWebsocket = () => {
    webSocketServer.close();
    startWebSocket(expressServer);
  };

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

  liveResultClient.on('close', () => {
    logger.error('liveResult websock disconnected. Reconnecting...');
    setTimeout(restartWebsocket, 2000);
  });

  return liveResultClient;
};

export default startWebSocket;
