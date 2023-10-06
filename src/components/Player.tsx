'use client';
import { useState } from 'react';
import styles from './player.module.css';
import { LeftOutlined, RightOutlined, PlayCircleOutlined } from "@ant-design/icons";


export default function Player() {
  const [infoHide, setInfoHide] = useState<boolean>();

  const back = () => {
    console.log("back");
  }

  const play = () => {
    console.log("play");
  }

  const forward = () => {
    console.log("forward");
  }

  const hide = () => {
    setInfoHide(!infoHide);
  }

  return (
    <div className={styles.container}>
      <button className={infoHide ? styles.infoHide : styles.info} type="button" onClick={hide}>
        <img className={styles.icon} src="https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ad/d8/60/add860cf-25d5-1867-29c9-0ffa9c7f1435/17UMGIM83107.rgb.jpg/1200x1200bb.jpg" />
        <div className={styles.infoText}>
          <p>Song name</p>
          <p>Artist name</p>
        </div>
      </button>
      <button className={styles.button} type="button" onClick={back}><LeftOutlined className={`${styles.icon} ${styles.small}`} /></button>
      <button className={styles.button} type="button" onClick={play}><PlayCircleOutlined className={styles.icon} /></button>
      <button className={styles.button} type="button" onClick={forward}><RightOutlined className={`${styles.icon} ${styles.small}`} /></button>
      <div className={styles.bar}></div>
    </div >
  );
}