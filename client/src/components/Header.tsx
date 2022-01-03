import React from "react";
import styles from "../styles/misc.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <h1>Rock Paper Scissors Hotline</h1>
      <p>
        Welcome to the Rock Paper Scissors show! <br />
        Here you can watch the exciting games <span>live</span> below.
        <br />
        You can also look at historical games and statistics of individual
        players by clicking the <span>Choose player</span> button
      </p>
    </div>
  );
}

export default Header;
