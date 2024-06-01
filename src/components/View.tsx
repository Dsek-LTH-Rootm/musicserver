import styles from "./view.module.css";
import { PlaylistBase } from "@/types";
import { addToQueue, play } from "@/API";
import ViewTrack from "./view_items/ViewTrack";
import {
  PartialSearchResult,
  SimplifiedAlbum,
  Track,
} from "@spotify/web-api-ts-sdk";
import ViewPlaylist from "./view_items/ViewPlaylist";
import ViewAlbum from "./view_items/ViewAlbum";
import { Toast } from "./Toast";

export default function View({
  props,
}: {
  props: Pick<PartialSearchResult, "albums" | "playlists" | "tracks">;
}) {
  const addToQueueHandler = (uri: string) => {
    Toast.add("Track added to queue");
    addToQueue(uri);
  };

  const playHandler = (uri: string, shuffle: boolean) => {
    Toast.add("Cleared queue and started playing");
    play(uri, shuffle);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Tracks</h3>
        {props?.tracks?.items.map((track: Track, index: number) => (
          <ViewTrack key={index} track={track} func={addToQueueHandler} />
        ))}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Playlists</h3>
        {props?.playlists?.items.map(
          (playlist: PlaylistBase, index: number) => (
            <ViewPlaylist key={index} playlist={playlist} func={playHandler} />
          )
        )}
      </div>
      <div className={styles.rowContainer}>
        <h3 className={styles.rowTitle}>Albums</h3>
        {props?.albums?.items.map((album: SimplifiedAlbum, index: number) => (
          <ViewAlbum key={index} album={album} func={playHandler} />
        ))}
      </div>
    </div>
  );
}
