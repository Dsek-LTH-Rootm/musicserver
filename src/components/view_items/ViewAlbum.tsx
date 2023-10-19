import styles from '../view.module.css';
import { albumProp } from "../View";
import { PlayCircleFilled } from "@ant-design/icons";
import Image from "next/image";
import { SimplifiedArtist } from '@spotify/web-api-ts-sdk';
import { GetArtist } from './ViewTrack';

export default function ViewAlbum({ album, func }: albumProp) {
  return (
    <div className={styles.smallContainer}>
      <button className={styles.button} onClick={() => func(album?.uri)}><PlayCircleFilled /></button>
      <a className={styles.cover} target="_blank" href={album?.external_urls?.spotify}><Image fill={true} alt="Playlist's cover art" src={album?.images[0]?.url} className={styles.cover} /></a>
      <a href={album?.external_urls?.spotify} target="_blank" className={styles.title}>{album?.name}</a>
      <div className={styles.artist}>
        {album?.artists?.map((artist: SimplifiedArtist, index: number, artists: SimplifiedArtist[]) =>
          <GetArtist key={index} artist={artist} index={index} artists={artists} />
        )}
      </div>
      <p className={styles.duration}>{album?.release_date}</p>
    </div>
  );
}