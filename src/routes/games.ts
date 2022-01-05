import { Router } from 'express';
import playerController from '../controllers/playerController';
import playerService from '../services/playerService';

const gamesRouter = Router();

gamesRouter.get('/players', async (_, res) => {
  const data = await playerService.getPlayerList();
  res.json(data);
});

gamesRouter.get('/player/:playerName', async (req, res) => {
  const { playerName } = req.params;
  const { cursor } = req.query as {cursor: string | undefined};
  const data = await playerController.getPlayerData(playerName, cursor);
  res.json(data);
});

export default gamesRouter;
