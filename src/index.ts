import express from 'express';
import http from 'http';
import path from 'path';
import mongoose from 'mongoose';
import config from './config';
import gamesRouter from './routes/games';
import historyUtils from './utils/historyGames';
import startWebSocket from './websockets';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use('/api/games', gamesRouter);
app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(config.DB_URI);

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
  historyUtils.initPlayerData();
});

startWebSocket(server);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });
}
