import React from "react";
import LiveGames from "./components/liveGames/LiveGames";
import liveStyles from "./styles/games.module.css";
import HistoryContainer from "./components/playerData/HistoryContainer";
import Header from "./components/Header";

function App() {
  return (
    <div className={liveStyles.gamesContainer}>
      <Header />
      <LiveGames />
      <HistoryContainer />
    </div>
  );
}

export default App;
