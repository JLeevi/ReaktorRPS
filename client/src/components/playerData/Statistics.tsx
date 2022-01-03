import React from "react";
import { PlayerStats } from "../../types";
import styles from "../../styles/history.module.css";

type Props = {
  stats: PlayerStats;
};

function Statistics({ stats }: Props) {
  return (
    <div className={styles.statistics}>
      <div>
        <h3>Total matches</h3>
        <p>{stats.totalGames}</p>
      </div>
      <div>
        <h3>Win ratio</h3>
        <p>{stats.winRatio.toPrecision(3)}</p>
      </div>
      <div>
        <h3>Most played hand</h3>
        <p>
          {stats.mostPlayed} ({stats.mostPlayedCount})
        </p>
      </div>
    </div>
  );
}

export default Statistics;
