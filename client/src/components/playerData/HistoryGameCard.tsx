import React from "react";
import renderUtils from "../../renderUtils";
import { HistoryGame } from "../../types";
import styles from "../../styles/history.module.css";

function HistoryGameCard({ game }: { game: HistoryGame }) {
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
      case "DRAW": {
        return styles.drawPlayer;
      }
      default: {
        return "";
      }
    }
  };
  const classA = getOutcomeClassName(game.playerA.outcome);
  const classB = getOutcomeClassName(game.playerB.outcome);
  return (
    <tr>
      <td className={classA}>{game.playerA.name}</td>
      <td className={classA}>
        {renderUtils.getHandIcon(game.playerA.played, true)}
      </td>
      <td className={classB}>
        {renderUtils.getHandIcon(game.playerB.played, true)}
      </td>
      <td className={classB}>{game.playerB.name}</td>

      <td>{new Date(game.t).toLocaleString()}</td>
    </tr>
  );
}

export default HistoryGameCard;
