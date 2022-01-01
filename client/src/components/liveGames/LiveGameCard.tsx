import React from "react";
import { LiveGame } from "../../types";
import styles from "../../styles/games.module.css";

function LiveGameCard({ game }: { game: LiveGame }) {
  const getOutcomeClassName = (
    outcome: "WIN" | "DRAW" | "LOSS" | undefined
  ) => {
    switch (outcome) {
      case "WIN": {
        return styles.winningPlayer;
      }
      case "LOSS": {
        return styles.losingPlayer;
      }
      default: {
        return "";
      }
    }
  };

  const aClassName = getOutcomeClassName(game.playerA.outcome);
  const bClassName = getOutcomeClassName(game.playerB.outcome);
  return (
    <tr className={game.isFinished ? styles.finishedGame : ""}>
      <td className={aClassName}>{game.playerA.name}</td>
      <td className={aClassName}>{game.playerA.played ?? "-"}</td>
      <td className={aClassName}>{game.playerA.outcome ?? "-"}</td>

      <td className={bClassName}>{game.playerB.name}</td>
      <td className={bClassName}>{game.playerB.played ?? "-"}</td>
      <td className={bClassName}>{game.playerB.outcome ?? "-"}</td>
    </tr>
  );
}

export default LiveGameCard;
