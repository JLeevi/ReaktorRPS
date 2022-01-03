import React from "react";
import styles from "../styles/misc.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1>Rock-Paper-Scissors Gameshow</h1>
      <h3>Here you can</h3>
      <p>
        <span className={styles.number}>1.</span>Watch ongoing games
        <span> live</span> as they happen
      </p>
      <br />
      <p>
        <span className={styles.number}>2.</span>You can also look at historical
        games and statistics of individual players by clicking the
        <span> Choose player</span> button
      </p>
    </div>
  );
}

export default Header;
