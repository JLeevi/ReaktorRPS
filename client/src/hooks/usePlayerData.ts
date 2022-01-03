import gameService from "../services/games";
import { useState } from "react";
import { HistoryGame, PlayerStats } from "../types";

type HookValue = [
  { games: HistoryGame[]; stats: PlayerStats | null },
  (playerId: string, cursor?: string) => void,
  () => void
];

const usePlayerData = (): HookValue => {
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [gameHistory, setGameHistory] = useState<HistoryGame[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchPlayerData = async (playerId: string, cursor?: string) => {
    const data = await gameService.getPlayerData(playerId, cursor);
    const { games, stats } = data;
    if (stats) {
      setPlayerStats(stats);
      setGameHistory(games);
    } else {
      setGameHistory((h) => [...h, ...games]);
    }
    setNextCursor(data.cursor);
  };

  const loadMore = () => {
    if (playerStats && nextCursor) {
      fetchPlayerData(playerStats?.name, nextCursor);
    }
  };

  return [
    { games: gameHistory, stats: playerStats },
    fetchPlayerData,
    loadMore,
  ];
};

export default usePlayerData;
