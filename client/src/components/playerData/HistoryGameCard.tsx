import React from "react";
import { GameResult } from "../../types";

function HistoryGameCard({ game }: { game: GameResult }) {
  return (
    <tr>
      <td>{game.playerA.name}</td>
      <td>{game.playerA.played ?? "-"}</td>

      <td>{game.playerB.name}</td>
      <td>{game.playerB.played ?? "-"}</td>

      <td>{new Date(game.t).toLocaleString()}</td>
    </tr>
  );
}

export default HistoryGameCard;
