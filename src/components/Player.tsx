'use client';
import { useEffect, useState } from 'react';
import styles from './player.module.css';
import { LeftOutlined, RightOutlined, PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { getAccessToken, pause, play, skipBack, skipNext } from '@/API';
import { AccessToken, Track } from '@spotify/web-api-ts-sdk';


export default function Player() {
  const [infoHide, setInfoHide] = useState<boolean>(true);
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [currentTrack, setTrack] = useState<Track>();
  const [player, setPlayer] = useState();

  const back = () => {
    skipBack();
  }

  const resume = () => {
    play();
  }

  const stop = () => {
    pause();
  }

  const forward = () => {
    skipNext();
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
      <button className={styles.button} type="button" onClick={stop}><PauseCircleFilled className={styles.icon} /></button>
      <button className={styles.button} type="button" onClick={resume}><PlayCircleFilled className={styles.icon} /></button>
      <button className={styles.button} type="button" onClick={forward}><RightOutlined className={`${styles.icon} ${styles.small}`} /></button>
      <div className={styles.bar}></div>
    </div >
  );
}