import React from "react";
import useLiveResultSocket from "../../hooks/useLiveResults";
import LiveGameCard from "./LiveGameCard";
import styles from "../../styles/games.module.css";

function LiveGames() {
  const liveGames = useLiveResultSocket();
  return (
    <div className={styles.liveGamesContainer}>
      <h2 className={styles.header}>Live games</h2>
      <div>
        {liveGames.map((g) => (
          <LiveGameCard key={g.gameId} game={g} />
        ))}
      </div>
    </div>
  );
}

export default LiveGames;
