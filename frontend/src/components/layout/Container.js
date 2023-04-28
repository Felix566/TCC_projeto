import styles from "./Container.module.css";

import React from "react";

function Container({ children }) {
  return <main className={styles.container}>{children}</main>;
}

export default Container;
