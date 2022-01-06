import React from "react";
import styles from "../../styles/misc.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <img alt="heart icon" src="/icons/heart.gif" />
        <p>
          This app uses icons from <a href="https://icons8.com">icons8.</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
