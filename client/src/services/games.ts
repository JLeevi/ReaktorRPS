import axios from "axios";
import { PlayerData } from "../types";

const baseUrl = "/api/games";

const getAllPlayers = async () => {
  const { data }: { data: string[] } = await axios.get(baseUrl);
  return data;
};

const getPlayerData = async (playerName: string) => {
  const url = `${baseUrl}/player/${playerName}`;
  const { data }: { data: PlayerData } = await axios.get(url);
  return data;
};

export default {
  getAllPlayers,
  getPlayerData,
};
