import { FC, useEffect, useState } from 'react';
import styles from './view.module.css';
import { albumItem, playlistItem, searchItem, track, trackItem, artist, simplifiedPlaylist } from '@/types';
import { PlayCircleFilled } from '@ant-design/icons';
import { addToQueue } from '@/API';

export default function View(props: any) {
  const [tracks, setTracks] = useState<trackItem>();
  const [albums, setAlbums] = useState<albumItem>();
  const [playlists, setPlaylists] = useState<playlistItem>();

  useEffect(() => {
    setTracks(props.props?.tracks);
    setAlbums(props.props?.albums);
    setPlaylists(props.props?.playlists);
  }, [props]);

  function getTime(originalTime: number) {
    let minutes = Math.floor((originalTime / (1000 * 60)) % 60);
    let seconds = Math.floor((originalTime / 1000) % 60);

    let minutesString = minutes < 10 ? "0" + minutes : minutes;
    let secondsString = seconds < 10 ? "0" + seconds : seconds;

    return minutesString + ":" + secondsString;
  }

  function getArtist(artist: artist, index: number, artists: artist[]) {
    if (index == artists.length - 1) {
      return " " + artist.name;
    } else {
      return " " + artist.name + "-";
    }
  }

  // move to separate components later
  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <h3>Tracks</h3>
        {tracks?.items.map((track: track, index: number) =>
          <div key={index} className={styles.smallContainer}>
            <button className={styles.button} onClick={() => addToQueue(track.uri)}><PlayCircleFilled /></button>
            <a className={styles.cover} target="_blank" href={track.album?.external_urls?.spotify}><img src={track.album?.images[0]?.url} className={styles.cover} /></a>
            <a href={track.external_urls?.spotify} target="_blank" className={styles.title}>{track.name}</a>
            <div className={styles.artist}>
              {track.artists?.map((artist: artist, index2: number, artists: artist[]) =>
                <a href={artist.external_urls?.spotify} target="_blank" key={index2} >{getArtist(artist, index2, artists)}</a>
              )
              }
            </div>
            <p className={styles.duration}>{getTime(track.duration_ms)}</p>
          </div>
        )
        }
      </div>
      <div className={styles.rowContainer}>
        <h3>Playlists</h3>
        {playlists?.items.map((playlist: simplifiedPlaylist, index: number) =>
          <div key={index} className={styles.smallContainer}>
            <button className={styles.button}><PlayCircleFilled /></button>
            <a className={styles.cover} target="_blank" href={playlist.external_urls?.spotify}><img src={playlist.images[0]?.url} className={styles.cover} /></a>
            <a href={playlist.external_urls?.spotify} target="_blank" className={styles.title}>{playlist.name}</a>
            <div className={styles.artist}>
              <a href={playlist.owner?.external_urls?.spotify} target="_blank">{playlist.owner?.display_name}</a>
            </div>
            <p className={styles.duration}>{getTime(playlist.tracks.total)}</p>
          </div>
        )
        }
      </div>
    </div>
  );
}