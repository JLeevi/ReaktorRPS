import { Router } from 'express';
import gameService from '../services/games';

const gamesRouter = Router();

gamesRouter.get('/', (_, res) => {
  const data = gameService.getPlayerList();
  res.json(data);
});

gamesRouter.get('/player/:playerName', (req, res) => {
  const { playerName } = req.params;
  const data = playerName ? gameService.getFullPlayerData(playerName) : {
    error: 'Player not found',
  };
  res.json(data);
});

export default gamesRouter;
