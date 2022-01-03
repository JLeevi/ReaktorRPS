import React from "react";
import { HistoryGame, PlayerStats } from "../../types";
import Statistics from "./Statistics";
import liveStyles from "../../styles/games.module.css";
import historyStyles from "../../styles/history.module.css";
import HistoryGames from "./HistoryGames";

function PlayerDataBlock({
  stats,
  history,
  loadMore,
}: {
  stats: PlayerStats;
  history: HistoryGame[];
  loadMore: () => void;
}) {
  return (
    <div className={historyStyles.playerHistory}>
      <h2 className={liveStyles.header}>{stats.name}</h2>
      <Statistics stats={stats} />
      <HistoryGames loadMore={loadMore} games={history} />
    </div>
  );
}

export default PlayerDataBlock;
