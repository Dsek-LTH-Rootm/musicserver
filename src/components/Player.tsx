'use client';
import styles from './player.module.css';
import { LeftOutlined, RightOutlined, PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { getCurrentStatus, pause, play, skipBack, skipNext } from '@/API';
import { PlaybackState, Track } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Player() {
  const [infoHide, setInfoHide] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<PlaybackState>();

  useEffect(() => {
    setInterval(async () => {
      const data = await getCurrentStatus();
      if (data !== undefined) {
        setCurrentTrack(data);
      }
    }, 5000);
  }, []);

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
        <Image alt="Song's album cover art" className={styles.icon} src={(currentTrack?.item as Track)?.album?.images[0]?.url} />
        <div className={styles.infoText}>
          <p>{currentTrack?.item?.name}</p>
          <p>{(currentTrack?.item as Track)?.artists[0]?.name}</p>
        </div>
      </button>
      <button className={styles.button} type="button" onClick={back}><LeftOutlined className={`${styles.icon} ${styles.small}`} /></button>
      {currentTrack?.is_playing && (
        <button className={styles.button} type="button" onClick={stop}><PauseCircleFilled className={styles.icon} /></button>
      )}
      {!currentTrack?.is_playing && (
        <button className={styles.button} type="button" onClick={resume}><PlayCircleFilled className={styles.icon} /></button>
      )}
      <button className={styles.button} type="button" onClick={forward}><RightOutlined className={`${styles.icon} ${styles.small}`} /></button>
      <div className={styles.bar}></div>
    </div >
  );
}