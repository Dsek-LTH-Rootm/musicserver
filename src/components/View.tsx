import styles from './view.module.css';
import { PlaylistBase } from '@/types';
import { addToQueue, play } from '@/API';
import ViewTrack from './view_items/ViewTrack';
import { SimplifiedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { pickProp } from './Browse';
import ViewPlaylist from './view_items/ViewPlaylist';
import ViewAlbum from './view_items/ViewAlbum';
import { useState } from 'react';

export interface trackProp {
  track: Track;
  func: (uri: string) => void;
  showButton?: boolean;
}

export interface playlistProp {
  playlist: PlaylistBase;
  func: (uri: string) => void;
}

export interface albumProp {
  album: SimplifiedAlbum;
  func: (uri: string) => void;
}

export default function View({ props }: pickProp) {
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
          <ViewPlaylist key={index} playlist={playlist} func={play} />
        )}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Albums</h3>
        {props?.albums?.items.map((album: SimplifiedAlbum, index: number) =>
          <ViewAlbum key={index} album={album} func={play} />
        )}
      </div>
    </div>
  );
}