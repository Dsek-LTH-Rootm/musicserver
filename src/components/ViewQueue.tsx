import { useEffect, useState } from 'react';
import styles from './view.module.css';
import { songQueue, track } from '@/types';
import ViewTrack from './view_items/ViewTrack';
import { getQueue, play } from '@/API';
import { Queue } from '@spotify/web-api-ts-sdk';
import { Track } from '@spotify/web-api-ts-sdk';

export default function ViewQueue() {
  const [tracks, setTracks] = useState<Track[]>()
  const [currentTrack, setCurrentTrack] = useState<Track>();

  useEffect(() => {
    const data = getQueue();
    data.then((value: Queue | undefined) => {
      if (!value) {
        return;
      }

      setTracks(value.queue as Track[]);
      setCurrentTrack(value.currently_playing as Track);
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <ViewTrack track={currentTrack as Track} func={play} />
        {tracks?.map((track: Track, index: number, tracks: Track[]) =>
          <ViewTrack key={index} track={track} func={play} />
        )}
      </div>
    </div>
  )
}