import React from "react";
import { PlayerStats } from "../../types";
import styles from "../../styles/history.module.css";

type Props = {
  player: PlayerStats;
};

function Statistics({ player }: Props) {
  return (
    <div>
      <h3>{player.name}</h3>
      <table className={styles.statisticsTable}>
        <thead>
          <tr>
            <th>Total matches</th>
            <th>Win ratio</th>
            <th>Most played hand</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{player.totalGames}</td>
            <td>{player.winRatio.toPrecision(3)}</td>
            <td>
              {player.mostPlayed} ({player.mostPlayedCount})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
