import React from "react";
import liveStyles from "../../styles/games.module.css";
import historyStyles from "../../styles/history.module.css";

type Props = {
  buttonText: string;
  infoText: string;
  showInfoText: boolean;
  toggleIsOpen: () => void;
};

function TogglableButton({
  buttonText,
  infoText,
  showInfoText,
  toggleIsOpen,
}: Props) {
  return (
    <div>
      {showInfoText && <h3 className={liveStyles.header}>{infoText}</h3>}
      <button
        className={historyStyles.choosePlayerButton}
        onClick={toggleIsOpen}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default TogglableButton;
