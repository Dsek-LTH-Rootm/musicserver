"use client";
import styles from "./player.module.css";
import {
  LeftOutlined,
  RightOutlined,
  PlayCircleFilled,
  PauseCircleFilled,
} from "@ant-design/icons";
import { getCurrentStatus, pause, play, skipBack, skipNext } from "@/API";
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import Image from "next/image";
import Slider from "./Slider";
import Progress from "./Progress";
import { Toast } from "./Toast";

export default function Player() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [infoHide, setInfoHide] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<PlaybackState>();

  useEffect(() => {
    getCurrentlyPlaying();
    setInterval(getCurrentlyPlaying, 1000);
  }, []);

  const getCurrentlyPlaying = async () => {
    const data = await getCurrentStatus();
    if (data !== false && data !== undefined) {
      setCurrentTrack(data);
      setPlaying(data?.is_playing);
    }
  };

  const back = async () => {
    const success = await skipBack();
    if (success) {
      setPlaying(true);
      Toast.add("Skipped to previous song");
    } else {
      Toast.add("Insufficient permissions");
    }
  };

  const resume = async () => {
    const success = await play();
    if (success) {
      setPlaying(true);
      play();
      Toast.add("Started playing");
    } else {
      Toast.add("Insufficient permissions");
    }
  };

  const stop = async () => {
    const success = await pause();
    if (success) {
      setPlaying(false);
      pause();
      Toast.add("Stopped playing");
    } else {
      Toast.add("Insufficient permissions");
    }
  };

  const forward = async () => {
    const success = await skipNext();
    if (success) {
      setPlaying(true);
      Toast.add("Skipped to next song");
    } else {
      Toast.add("Insufficient permissions");
    }
  };

  const hide = () => {
    setInfoHide(!infoHide);
  };

  return (
    <div className={styles.container}>
      <div className={infoHide ? styles.infoHide : styles.info} onClick={hide}>
        <div
          style={{ position: "relative", height: "100%", aspectRatio: "1 / 1" }}
        >
          <Image
            fill={true}
            sizes="300px"
            alt="Song's album cover art"
            className={styles.icon}
            src={
              (currentTrack?.item as Track)?.album?.images[0]?.url ??
              "/next.svg"
            }
          />
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className={styles.infoText}>
            <p>
              <a
                href={currentTrack?.item?.external_urls?.spotify}
                className={styles.link}
              >
                {currentTrack?.item?.name}
              </a>
            </p>
            <p>
              <a
                href={
                  (currentTrack?.item as Track)?.artists[0]?.external_urls
                    ?.spotify
                }
                className={styles.link}
              >
                {(currentTrack?.item as Track)?.artists[0]?.name}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} type="button" onClick={back}>
          <LeftOutlined className={`${styles.icon} ${styles.small}`} />
        </button>
        {playing && (
          <button className={styles.button} type="button" onClick={stop}>
            <PauseCircleFilled className={styles.icon} />
          </button>
        )}
        {!playing && (
          <button className={styles.button} type="button" onClick={resume}>
            <PlayCircleFilled className={styles.icon} />
          </button>
        )}
        <button className={styles.button} type="button" onClick={forward}>
          <RightOutlined className={`${styles.icon} ${styles.small}`} />
        </button>
      </div>
      <Progress playbackState={currentTrack as PlaybackState} />
      <Slider />
    </div>
  );
}
