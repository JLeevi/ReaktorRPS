import React, { useState } from "react";
import PlayerList from "./PlayerList";
import historyStyles from "../../styles/history.module.css";
import PlayerDataBlock from "./PlayerDataBlock";
import TogglableButton from "../misc/TogglableButton";
import usePlayerData from "../../hooks/usePlayerData";

function HistoryContainer() {
  const [playerListOpen, setPlayerListOpen] = useState<boolean>(false);
  const [{ stats, games }, fetchPlayerData, loadMorePlayerData] =
    usePlayerData();

  const choosePlayer = (playerName: string) => {
    setPlayerListOpen(false);
    fetchPlayerData(playerName);
  };

  const togglePlayerList = () => {
    setPlayerListOpen((v) => !v);
  };

  return (
    <div className={historyStyles.playersContainer}>
      <TogglableButton
        showInfoText={!stats}
        toggleIsOpen={togglePlayerList}
        infoText="Choose a player to view historical results"
        buttonText="Choose player"
      />
      {playerListOpen && (
        <PlayerList toggleList={togglePlayerList} choosePlayer={choosePlayer} />
      )}
      {stats && games && (
        <PlayerDataBlock
          stats={stats}
          history={games}
          loadMore={loadMorePlayerData}
        />
      )}
    </div>
  );
}

export default HistoryContainer;
