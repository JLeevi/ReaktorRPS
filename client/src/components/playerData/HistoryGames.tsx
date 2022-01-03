import React from "react";
import { HistoryGame } from "../../types";
import styles from "../../styles/history.module.css";
import HistoryGameCard from "./HistoryGameCard";

function HistoryGames({
  loadMore,
  games,
}: {
  games: HistoryGame[];
  loadMore: () => void;
}) {
  return (
    <>
      <table className={styles.historyTable}>
        <thead>
          <tr>
            <th className={styles.wide}>Player A</th>
            <th />
            <th />
            <th className={styles.wide}>Player B</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <HistoryGameCard key={game.gameId} game={game} />
          ))}
        </tbody>
      </table>
      <button onClick={loadMore}>Load more</button>
    </>
  );
}

export default HistoryGames;
