import React from "react";
import styles from "../../styles/misc.module.css";

function Loading({ message }: { message: string }) {
  return (
    <div className={styles.loadingBlock}>
      <p>{message}</p>
    </div>
  );
}

export default Loading;
