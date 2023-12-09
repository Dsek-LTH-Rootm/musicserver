"use client";

import styles from './toast.module.css';

export function ToastContainer() {
  return (
    <div id="toast-container">
    </div>
  )
} 

export function Toast({message}: {message: string}) {

  // if (!message) {
    return (
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
      </div>
    )
  // }

  // return false;
}