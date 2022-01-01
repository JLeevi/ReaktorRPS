import React from "react";
import { PlayerData } from "../../types";
import Statistics from "./Statistics";
import liveStyles from "../../styles/games.module.css";
import historyStyles from "../../styles/history.module.css";
import HistoryGames from "./HistoryGames";

function PlayerDataBlock({ player }: { player: PlayerData | null }) {
  return (
    <div className={historyStyles.playerHistory}>
      <h2 className={liveStyles.header}>{player?.name}</h2>
      {player && (
        <>
          <Statistics player={player.stats} />
          <HistoryGames playerId={player.name} games={player.history} />
        </>
      )}
    </div>
  );
}

export default PlayerDataBlock;
