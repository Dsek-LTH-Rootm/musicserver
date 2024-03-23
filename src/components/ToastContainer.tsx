"use client";

import React from 'react';
import styles from './toast.module.css';

export function ToastContainer() {
  return (
    <div id="toast-container" style={{position: "absolute", width: "100%", display: "flex", justifyContent: "center"}}>
    </div>
  )
} 

export function ToastComponent({message}: {message: string}) {

  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
    </div>
  )
}