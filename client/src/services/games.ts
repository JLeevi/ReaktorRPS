import axios from "axios";
import { HistoryGame, PlayerStats } from "../types";

const baseUrl = "/api/games";

type PlayerDataResponse = {
  games: HistoryGame[];
  cursor: string;
  stats?: PlayerStats;
  error?: string;
};

const getAllPlayers = async () => {
  const url = `${baseUrl}/players`;
  const { data }: { data: string[] } = await axios.get(url);
  return data;
};

const getPlayerData = async (playerName: string, cursor?: string) => {
  let url = `${baseUrl}/player/${playerName}`;
  if (cursor) url += `?cursor=${cursor}`;
  const { data }: { data: PlayerDataResponse } = await axios.get(url);
  return data;
};

export default {
  getAllPlayers,
  getPlayerData,
};
