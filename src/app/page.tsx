'use client';
import styles from './page.module.css'
import Player from '@/components/Player'
import Browse from '@/components/Browse'
import { updateAccessToken } from '@/API';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

export default function Home() {
  SpotifyApi.performUserAuthorization("f6c2c310440440ada66232669bb965b6", "http://localhost:3000", ["user-read-playback-state", "user-read-private", "user-modify-playback-state", "user-read-currently-playing", "app-remote-control", "streaming", "playlist-read-private", "playlist-read-collaborative", "playlist-modify-private", "playlist-modify-public", "user-top-read", "user-read-recently-played", "user-library-modify", "user-library-read"], (accessToken) => updateAccessToken(accessToken));

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Music server</h1>
      </div>
      <Browse />
      <Player />
    </main >
  )
}
