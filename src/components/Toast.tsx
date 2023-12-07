"use client";

import styles from './toast.module.css';

export default function Toast({message}: {message: string}) {

  // if (!message) {
    return (
      <div className={styles.container} id="toast-container">
        <p className={styles.message}>{message}</p>
      </div>
    )
  // }

  // return false;
}