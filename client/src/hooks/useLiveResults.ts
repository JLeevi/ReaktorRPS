import { useEffect, useState } from "react";
import { LiveEvent, LiveGame } from "../types";
import config from "../config";

const useLiveResults = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [liveGames, setLiveGames] = useState<LiveGame[]>([]);

  useEffect(() => {
    const removeGame = (game: LiveGame) => {
      setLiveGames((l) => l.filter((g) => g?.gameId !== game.gameId));
    };

    const handleFinishGame = (updatedGame: LiveGame) => {
      setLiveGames((l) =>
        l.map((game) =>
          game.gameId === updatedGame.gameId ? updatedGame : game
        )
      );
      setTimeout(() => removeGame(updatedGame), 7500);
    };

    const handleBeginGame = (game: LiveGame) => {
      setLiveGames((l) => [...l, game]);
    };

    const createSocket = () => {
      const ws = new WebSocket(config.WS_LIVE_RESULTS_URL);

      ws.onmessage = (evt) => {
        const { data } = evt;
        const event = JSON.parse(data) as LiveEvent;
        if (event.type === "INIT") {
          setLiveGames(event.data);
        } else if (event.type === "GAME_BEGIN") {
          handleBeginGame(event.data);
        } else {
          handleFinishGame(event.data);
        }
      };

      setWebsocket(ws);
    };

    if (!websocket) {
      createSocket();
    }
  }, [websocket]);

  return liveGames;
};

export default useLiveResults;
