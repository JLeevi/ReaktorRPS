import React from "react";
import { HistoryGame } from "../../types";
import styles from "../../styles/history.module.css";
import HistoryGameCard from "./HistoryGameCard";

function HistoryGames({
  loadMore,
  games,
  isLoading,
}: {
  games: HistoryGame[];
  loadMore: (() => void) | undefined;
  isLoading: boolean;
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
          {isLoading && <p>Loading games...</p>}
          {games.map((game) => (
            <HistoryGameCard key={game.gameId} game={game} />
          ))}
        </tbody>
      </table>
      {loadMore && (
        <button className={styles.loadMoreButton} onClick={loadMore}>
          Load more
        </button>
      )}
    </>
  );
}

export default HistoryGames;
