import React from "react";
import useLiveResultSocket from "../../hooks/useLiveResults";
import LiveGameCard from "./LiveGameCard";
import styles from "../../styles/games.module.css";

function LiveGames() {
  const liveGames = useLiveResultSocket();
  return (
    <div className={styles.liveGamesContainer}>
      <h2 className={styles.header}>Live games</h2>
      <table className={styles.liveGameTable}>
        <thead>
          <tr>
            <th className={styles.wide}>Player A</th>
            <th>Weapon</th>
            <th>Outcome</th>

            <th className={styles.wide}>Player B</th>
            <th>Weapon</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {liveGames.map((g) => (
            <LiveGameCard key={g.gameId} game={g} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LiveGames;
