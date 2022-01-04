import React from "react";
import styles from "../../styles/misc.module.css";

function ErrorBlock({ error }: { error: string }) {
  return (
    <div className={styles.errorBlock}>
      <p>{error}</p>
    </div>
  );
}

export default ErrorBlock;
