import React, { useEffect, useState } from "react";
import { GameResult } from "../../types";
import liveStyles from "../../styles/games.module.css";
import HistoryGameCard from "./HistoryGameCard";

const INITIAL_VISIBLE_COUNT = 50;

function HistoryGames({
  playerId,
  games,
}: {
  playerId: string;
  games: GameResult[];
}) {
  const [visibleCount, setVisibleCount] = useState<number>(
    INITIAL_VISIBLE_COUNT
  );

  const increaseVisbleCount = () => {
    setVisibleCount((c) => c + INITIAL_VISIBLE_COUNT);
  };

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [playerId]);

  const visibleGames = games.slice(0, visibleCount);

  return (
    <>
      <table className={liveStyles.liveGameTable}>
        <thead>
          <tr>
            <th className={liveStyles.wide}>Player A</th>
            <th>Weapon</th>

            <th className={liveStyles.wide}>Player B</th>
            <th>Weapon</th>

            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {visibleGames.map((game) => (
            <HistoryGameCard key={game.gameId} game={game} />
          ))}
        </tbody>
      </table>
      {games.length > visibleCount && (
        <button onClick={increaseVisbleCount}>Load more</button>
      )}
    </>
  );
}

export default HistoryGames;
