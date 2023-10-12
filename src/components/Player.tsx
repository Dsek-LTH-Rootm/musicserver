'use client';
import styles from './player.module.css';
import { LeftOutlined, RightOutlined, PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { pause, play, skipBack, skipNext } from '@/API';
import { PlaybackState, Track, TrackItem } from '@spotify/web-api-ts-sdk';
import { useState } from 'react';

interface playerProps {
  props: PlaybackState;
}

export default function Player({ props }: playerProps) {
  const [infoHide, setInfoHide] = useState<boolean>(true);

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
        <img className={styles.icon} src={(props?.item as Track)?.album?.images[0]?.url} />
        <div className={styles.infoText}>
          <p>{props?.item?.name}</p>
          <p>{(props?.item as Track)?.artists[0]?.name}</p>
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