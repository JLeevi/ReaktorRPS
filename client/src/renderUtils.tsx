import { Weapon } from "./types";

const getHandIcon = (weapon: Weapon | undefined, white = false) => {
  const paperUrl = white
    ? "/icons/hand-paper-white.png"
    : "/icons/hand-paper.png";
  const rockUrl = white ? "/icons/hand-rock-white.png" : "/icons/hand-rock.png";
  const scissorsUrl = white
    ? "/icons/hand-scissors-white.png"
    : "/icons/hand-scissors.png";
  switch (weapon) {
    case "PAPER": {
      return <img alt="hand-paper" src={paperUrl} />;
    }
    case "ROCK": {
      return <img alt="hand-rock" src={rockUrl} />;
    }
    case "SCISSORS": {
      return <img alt="hand-scissors" src={scissorsUrl} />;
    }
    default: {
      return <span>?</span>;
    }
  }
};

export default {
  getHandIcon,
};
