import React from "react";
import { LiveGame, Weapon } from "../../types";
import styles from "../../styles/games.module.css";
import renderUtils from "../../renderUtils";

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
      case "DRAW": {
        return styles.drawPlayer;
      }
      default: {
        return "";
      }
    }
  };

  const getInitial = (name: string) => name.slice(0, 1);

  const aClassName = getOutcomeClassName(game.playerA.outcome);
  const bClassName = getOutcomeClassName(game.playerB.outcome);
  return (
    <div
      className={
        game.isFinished ? `${styles.finishedGame} ${styles.game}` : styles.game
      }
    >
      <div className={styles.tiimalasi}>
        <img alt="hourglass" src="/icons/icons8-hourglass.gif" />
      </div>
      <div className={`${styles.player} ${aClassName}`}>
        <div className={styles.picture}>{getInitial(game.playerA.name)}</div>
        <p>{game.playerA.name}</p>
        <div className={styles.played}>
          {renderUtils.getHandIcon(game.playerA.played as Weapon | undefined)}
        </div>
      </div>
      <p className={styles.vs}>VS</p>
      <div className={`${styles.player} ${bClassName}`}>
        <div className={styles.picture}>{getInitial(game.playerB.name)}</div>
        <p>{game.playerB.name}</p>
        <div className={styles.played}>
          {renderUtils.getHandIcon(game.playerB.played as Weapon | undefined)}
        </div>
      </div>
    </div>
  );
}

export default LiveGameCard;
