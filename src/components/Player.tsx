'use client';
import styles from './player.module.css';
import { LeftOutlined, RightOutlined, PlayCircleFilled, PauseCircleFilled } from "@ant-design/icons";
import { getCurrentStatus, pause, play, skipBack, skipNext } from '@/API';
import { PlaybackState, Track } from '@spotify/web-api-ts-sdk';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from './Slider';
import Progress from './Progress';
import { toast } from './toast.js';

export default function Player() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [infoHide, setInfoHide] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<PlaybackState>();

  useEffect(() => {
    getCurrentlyPlaying();
    setInterval(getCurrentlyPlaying, 500);
  }, []);

  const getCurrentlyPlaying = async () => {
    const data = await getCurrentStatus();
    if (data !== undefined) {
      setCurrentTrack(data);
      setPlaying(data?.is_playing);
    }
  }

  const back = () => {
    setPlaying(true);
    skipBack();
    toast.add("Skipped to previous song");
  }

  const resume = () => {
    setPlaying(true);
    play();
    toast.add("Started playing")
  }

  const stop = () => {
    setPlaying(false);
    pause();
    toast.add("Stopped playing");
  }

  const forward = () => {
    setPlaying(true);
    skipNext();
    toast.add("Skipped to next song");
  }

  const hide = () => {
    setInfoHide(!infoHide);
  }

  return (
    <div className={styles.container}>
      <button className={infoHide ? styles.infoHide : styles.info} type="button" onClick={hide}>
        <div style={{ position: "relative", height: "100%", aspectRatio: "1 / 1" }}>
          <Image fill={true} alt="Song's album cover art" className={styles.icon} src={(currentTrack?.item as Track)?.album?.images[0]?.url} />
        </div>
        <div className={styles.infoText}>
          <p><a href={currentTrack?.item?.external_urls?.spotify} className={styles.link}>{currentTrack?.item?.name}</a></p>
          <p><a href={(currentTrack?.item as Track)?.artists[0]?.external_urls?.spotify} className={styles.link}>{(currentTrack?.item as Track)?.artists[0]?.name}</a></p>
        </div>
      </button>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={back}><LeftOutlined className={`${styles.icon} ${styles.small}`} /></button>
        {playing && (
          <button className={styles.button} type="button" onClick={stop}><PauseCircleFilled className={styles.icon} /></button>
        )}
        {!playing && (
          <button className={styles.button} type="button" onClick={resume}><PlayCircleFilled className={styles.icon} /></button>
        )}
        <button className={styles.button} type="button" onClick={forward}><RightOutlined className={`${styles.icon} ${styles.small}`} /></button>
      </div>
      <Progress playbackState={currentTrack as PlaybackState}/>
      <Slider />
    </div >
  );
}