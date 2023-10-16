import styles from './view.module.css';
import { PlaylistBase, simplifiedArtist } from '@/types';
import { PlayCircleFilled } from '@ant-design/icons';
import { addToQueue, play } from '@/API';
import ViewTrack from './view_items/ViewTrack';
import { Playlist, SimplifiedArtist, Track } from '@spotify/web-api-ts-sdk';
import { pickProp } from './Browse';
import Image from 'next/image';

export interface trackProp {
  track: Track;
  func: (uri: string) => void;
  showButton?: boolean;
}

export interface playlistProp {
  playlist: Playlist;
  func: (uri: string) => void;
}

export default function View({ props }: pickProp) {
  // move to separate components later

  const resume = (context_uri: string) => {
    play(context_uri);
  }

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Tracks</h3>
        {props?.tracks?.items.map((track: Track, index: number) =>
          <ViewTrack key={index} track={track} func={addToQueue} />
        )}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Playlists</h3>
        {props?.playlists?.items.map((playlist: PlaylistBase, index: number) =>
          <div key={index} className={styles.smallContainer}>
            <button className={styles.button} onClick={() => resume(playlist.uri)}><PlayCircleFilled /></button>
            <a className={styles.cover} target="_blank" href={playlist.external_urls?.spotify}><Image fill={true} alt="Playlist's cover art" src={playlist.images[0]?.url} className={styles.cover} /></a>
            <a href={playlist.external_urls?.spotify} target="_blank" className={styles.title}>{playlist.name}</a>
            <div className={styles.artist}>
              <a href={playlist.owner?.external_urls?.spotify} target="_blank">{playlist.owner?.display_name}</a>
            </div>
            <p className={styles.duration}>{playlist.description}</p>
          </div>
        )
        }
      </div>
    </div>
  );
}