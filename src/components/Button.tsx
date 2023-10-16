"use client";
import styles from "./button.module.css";

export interface propsButton {
  element: any;
  func: () => void;
  func2?: () => void;
}

export default function Button({ element, func }: propsButton) {
  return (
    <button type="button" className={styles.button} onClick={func}>{element}</button>
  )
}