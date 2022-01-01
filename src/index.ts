import express from 'express';
import http from 'http';
import path from 'path';
import config from './config';
import gamesRouter from './routes/games';
import utils from './utils/utils';
import startWebSocket from './websockets';

const app = express();

app.use(express.json());
app.use('/api/games', gamesRouter);
app.use(express.static(path.join(__dirname, 'build')));

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
  utils.initPlayerData();
});

startWebSocket(server);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
  });
}
