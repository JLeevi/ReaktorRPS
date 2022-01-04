import axios from "axios";
import { PlayerDataResponse } from "../types";

const baseUrl = "/api/games";

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
