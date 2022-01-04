import gameService from "../services/games";
import { useState } from "react";
import { HistoryGame, PlayerDataSuccess, PlayerStats } from "../types";

type HookValue = [
  { games: HistoryGame[]; stats: PlayerStats | null },
  (playerId: string, cursor?: string) => void,
  (() => void) | undefined,
  boolean,
  string | null
];

const usePlayerData = (): HookValue => {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [gameHistory, setGameHistory] = useState<HistoryGame[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const clearError = () => {
    setErrorMsg(null);
  };

  const showError = (error: string) => {
    setErrorMsg(error);
    setTimeout(clearError, 5000);
  };

  const clearData = () => {
    setPlayerStats(null);
    setGameHistory([]);
    setNextCursor(null);
  };

  const handlePlayerDataResponse = (data: PlayerDataSuccess) => {
    const { games, stats } = data;
    if (stats) {
      setPlayerStats(stats);
      setGameHistory(games);
    } else {
      setGameHistory((h) => [...h, ...games]);
    }
    setNextCursor(data.cursor);
  };

  const fetchPlayerData = async (playerName: string, cursor?: string) => {
    if (playerName !== playerStats?.name) {
      clearData();
    }
    setLoading(true);
    const data = await gameService.getPlayerData(playerName, cursor);
    const { success } = data;
    if (!success) {
      showError(data.error);
    } else {
      handlePlayerDataResponse(data);
    }
    setLoading(false);
  };

  const loadMore = () => {
    if (playerStats && nextCursor) {
      fetchPlayerData(playerStats?.name, nextCursor);
    }
  };

  return [
    { games: gameHistory, stats: playerStats },
    fetchPlayerData,
    nextCursor ? loadMore : undefined,
    loading,
    errorMsg,
  ];
};

export default usePlayerData;
