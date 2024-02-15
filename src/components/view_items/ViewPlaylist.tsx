import styles from '../view.module.css';
import { playlistProp } from "../View";
import { PlayCircleFilled } from "@ant-design/icons";
import Image from "next/image";

export default function ViewPlaylist({ playlist, func }: playlistProp) {
  return (
    <div className={styles.smallContainer}>
      <button className={styles.button} onClick={() => func(playlist?.uri, true)}><PlayCircleFilled /></button>
      <a className={styles.cover} target="_blank" href={playlist?.external_urls?.spotify}><Image fill={true} alt="Playlist's cover art" src={playlist?.images[0]?.url} className={styles.cover} /></a>
      <a href={playlist?.external_urls?.spotify} target="_blank" className={styles.title}>{playlist?.name}</a>
      <div className={styles.artist}>
        <a href={playlist?.owner?.external_urls?.spotify} target="_blank">{playlist?.owner?.display_name}</a>
      </div>
      <p className={styles.duration}>{playlist?.description}</p>
    </div>
  )
}