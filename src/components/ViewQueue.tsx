import { useEffect, useState } from 'react';
import styles from './view.module.css';
import { songQueue, track } from '@/types';
import ViewTrack from './view_items/ViewTrack';
import { getQueue, play } from '@/API';
import { Episode, Queue } from '@spotify/web-api-ts-sdk';
import { Track } from '@spotify/web-api-ts-sdk';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';

interface viewQueueProp {
  show: boolean;
}

export default function ViewQueue({ show }: viewQueueProp) {
  const [tracks, setTracks] = useState<Track[]>()
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [])

  useEffect(() => {
    setLoading(true);
    if (!show) return;

    const data = getQueue();
    data.then((value: Queue | undefined) => {
      if (!value) {
        console.log("queue is empty!");
        return;
      }

      setTracks(value.queue as Track[]);
      setCurrentTrack(value.currently_playing as Track);
      setLoading(false);
    });
  }, [show]);

  function update() {
    setLoading(true);
    const data = getQueue();
    data.then((value: Queue | undefined) => {
      if (!value) {
        console.log("queue is empty!");
        return;
      }

      setTracks(value.queue as Track[]);
      setCurrentTrack(value.currently_playing as Track);
      setLoading(false);
    });
  }

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <LoadingOutlined />
        </div>
      )}
      {!loading && currentTrack !== null && tracks !== null && (
        <div className={styles.container}>
          <div className={styles.rowContainer}>
            <div className={styles.rowButtonContainer}>
              <h3 className={styles.rowTitle}>Queue</h3>
              <button type="button" className={styles.rowButton} onClick={update}><ReloadOutlined /></button>
            </div>
            <ViewTrack track={currentTrack as Track} func={play} showButton={false} />
            {tracks?.map((track: Track, index: number, tracks: Track[]) =>
              <ViewTrack key={index} track={track} func={play} showButton={false} />
            )}
          </div>
        </div>
      )}
    </>
  )
}