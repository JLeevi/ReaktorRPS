import { Router } from 'express';
import gameService from '../services/games';

const gamesRouter = Router();

gamesRouter.get('/players', async (_, res) => {
  const data = await gameService.getPlayerList();
  res.json(data);
});

gamesRouter.get('/player/:playerName', async (req, res) => {
  const { playerName } = req.params;
  const { cursor } = req.query as {cursor: string | undefined};
  const data = await gameService.getPlayerHistory(playerName, cursor);
  res.json(data);
});

export default gamesRouter;
