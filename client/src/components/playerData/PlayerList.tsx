import React, { useEffect, useState } from "react";
import gameService from "../../services/games";
import liveStyles from "../../styles/games.module.css";
import historyStyles from "../../styles/history.module.css";

type Props = {
  choosePlayer: (playerName: string) => void;
  toggleList: () => void;
};

function PlayerList({ toggleList, choosePlayer }: Props) {
  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const allPlayers = await gameService.getAllPlayers();
      setPlayers(allPlayers);
    };
    fetchPlayers();
  }, []);

  return (
    <div className={historyStyles.playerList}>
      <h3 className={liveStyles.header}>All players</h3>
      <button className={historyStyles.closeButton} onClick={toggleList}>
        Close
      </button>
      <div>
        {players.map((p) => (
          <button
            style={{ display: "block" }}
            onClick={() => choosePlayer(p)}
            key={p}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
