import styles from '../view.module.css';
import { PlayCircleFilled } from "@ant-design/icons";
import { getArtist, getTime, trackProp } from "../View";
import { SimplifiedArtist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

export default function ViewTrack({ track, func, showButton }: trackProp) {
  return (
    <div className={styles.smallContainer}>
      {showButton !== false && (
        <button className={styles.button} onClick={() => func(track?.uri)}><PlayCircleFilled /></button>
      )}
      <a className={styles.cover} target="_blank" href={track?.album?.external_urls?.spotify}><Image alt="Song's album cover art" src={track?.album?.images[0]?.url} className={styles.cover} /></a>
      <a href={track?.external_urls?.spotify} target="_blank" className={styles.title}>{track?.name}</a>
      <div className={styles.artist}>
        {track?.artists?.map((artist: SimplifiedArtist, index2: number, artists: SimplifiedArtist[]) =>
          <a href={artist?.external_urls?.spotify} target="_blank" key={index2} >{getArtist(artist, index2, artists)}</a>
        )
        }
      </div>
      <p className={styles.duration}>{getTime(track?.duration_ms)}</p>
    </div>
  );
}