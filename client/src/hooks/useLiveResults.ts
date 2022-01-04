import { useEffect, useState } from "react";
import { LiveEvent, LiveGame } from "../types";
import config from "../config";

const useLiveResults = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [liveGames, setLiveGames] = useState<LiveGame[]>([]);

  const removeGame = (game: LiveGame) => {
    setLiveGames((l) => l.filter((g) => g?.gameId !== game.gameId));
  };

  const handleBeginGame = (game: LiveGame) => {
    setLiveGames((l) => [...l, game]);
  };

  useEffect(() => {
    const handleFinishGame = (updatedGame: LiveGame) => {
      setLiveGames((l) =>
        l.map((game) =>
          game.gameId === updatedGame.gameId ? updatedGame : game
        )
      );
      setTimeout(() => removeGame(updatedGame), 7500);
    };

    const handleLiveEvent = (event: LiveEvent) => {
      switch (event.type) {
        case "INIT":
          setLiveGames(event.data);
          break;
        case "GAME_BEGIN":
          handleBeginGame(event.data);
          break;
        case "GAME_RESULT":
          handleFinishGame(event.data);
          break;
        default:
          console.log("Unidentified live-event received:\n", event);
      }
    };

    const attemptReconnect = () => {
      setTimeout(() => setWebsocket(null), 5 * 1000);
    };

    const createSocket = () => {
      const ws = new WebSocket(config.WS_LIVE_RESULTS_URL);

      ws.onmessage = (evt) => {
        const { data } = evt;
        const event = JSON.parse(data) as LiveEvent;
        handleLiveEvent(event);
      };

      ws.onclose = () => {
        console.log("websocket disconnected, attempting reconnect...");
        attemptReconnect();
      };

      setWebsocket(ws);
    };

    if (!websocket) {
      createSocket();
    }

    return () => {
      websocket?.close();
    };
  }, [websocket]);

  return liveGames;
};

export default useLiveResults;
