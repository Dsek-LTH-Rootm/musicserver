import { useEffect, useState } from 'react';
import styles from './view.module.css';
import { songQueue, track } from '@/types';
import ViewTrack from './view_items/ViewTrack';
import { getQueue, play } from '@/API';
import { Episode, Queue } from '@spotify/web-api-ts-sdk';
import { Track } from '@spotify/web-api-ts-sdk';

interface viewQueueProp {
  show: boolean;
}

export default function ViewQueue({ show }: viewQueueProp) {
  const [tracks, setTracks] = useState<Track[]>()
  const [currentTrack, setCurrentTrack] = useState<Track>();

  useEffect(() => {
    if (!show) return;

    const data = getQueue();
    data.then((value: Queue | undefined) => {
      if (!value) {
        console.log("queue is empty!");
        return;
      }

      setTracks(value.queue as Track[]);
      setCurrentTrack(value.currently_playing as Track);
    })
  }, [show]);

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <ViewTrack track={currentTrack as Track} func={play} showButton={false} />
        {tracks?.map((track: Track, index: number, tracks: Track[]) =>
          <ViewTrack key={index} track={track} func={play} showButton={false} />
        )}
      </div>
    </div>
  )
}