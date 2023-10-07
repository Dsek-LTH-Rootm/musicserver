import styles from './view.module.css';
import { PlaylistBase, simplifiedArtist } from '@/types';
import { PlayCircleFilled } from '@ant-design/icons';
import { addToQueue } from '@/API';
import ViewTrack from './view_items/ViewTrack';
import { PartialSearchResult, Playlist, SimplifiedArtist, Track } from '@spotify/web-api-ts-sdk';
import { pickProp } from './Browse';

export interface trackProp {
  track: Track;
  func: (uri: string) => void;
}

export interface playlistProp {
  playlist: Playlist;
  func: (uri: string) => void;
}

export default function View({ props }: pickProp) {
  // const [result, setResult] = useState<Pick<PartialSearchResult, "albums" | "playlists" | "tracks">>();

  // useEffect(() => {
  //   setResult(props);
  // }, [props]);

  // move to separate components later
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
            <button className={styles.button}><PlayCircleFilled /></button>
            <a className={styles.cover} target="_blank" href={playlist.external_urls?.spotify}><img src={playlist.images[0]?.url} className={styles.cover} /></a>
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

export function getTime(originalTime: number) {
  let minutes = Math.floor((originalTime / (1000 * 60)) % 60);
  let seconds = Math.floor((originalTime / 1000) % 60);

  let minutesString = minutes < 10 ? "0" + minutes : minutes;
  let secondsString = seconds < 10 ? "0" + seconds : seconds;

  return minutesString + ":" + secondsString;
}

export function getArtist(artist: SimplifiedArtist, index: number, artists: SimplifiedArtist[]) {
  if (index == artists.length - 1) {
    return " " + artist.name;
  } else {
    return " " + artist.name + "-";
  }
}