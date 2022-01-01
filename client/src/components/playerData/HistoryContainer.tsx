import React, { useState } from "react";
import PlayerList from "./PlayerList";
import gameService from "../../services/games";
import { PlayerData } from "../../types";
import historyStyles from "../../styles/history.module.css";
import PlayerDataBlock from "./PlayerDataBlock";
import TogglableButton from "../misc/TogglableButton";

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [playerListOpen, setPlayerListOpen] = useState<boolean>(false);

  const togglePlayerList = () => {
    setPlayerListOpen((v) => !v);
  };

  const fetchPlayerData = async (playerName: string) => {
    togglePlayerList();
    const data = await gameService.getPlayerData(playerName);
    setPlayerData(data);
  };

  return (
    <div className={historyStyles.playersContainer}>
      <TogglableButton
        showInfoText={!playerData}
        toggleIsOpen={togglePlayerList}
        infoText="Choose a player to view historical results"
        buttonText="Choose player"
      />
      {playerListOpen && (
        <PlayerList
          toggleList={togglePlayerList}
          choosePlayer={fetchPlayerData}
        />
      )}
      <PlayerDataBlock player={playerData} />
    </div>
  );
}

export default App;
