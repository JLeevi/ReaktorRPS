import React from "react";
import LiveGames from "./components/liveGames/LiveGames";
import liveStyles from "./styles/games.module.css";
import HistoryContainer from "./components/playerData/HistoryContainer";
import Header from "./components/misc/Header";
import Footer from "./components/misc/Footer";

function App() {
  return (
    <div className={liveStyles.gamesContainer}>
      <Header />
      <LiveGames />
      <HistoryContainer />
      <Footer />
    </div>
  );
}

export default App;
