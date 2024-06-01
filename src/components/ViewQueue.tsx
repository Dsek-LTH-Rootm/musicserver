"use client";
import { useEffect, useState } from "react";
import styles from "./view.module.css";
import ViewTrack from "./view_items/ViewTrack";
import { getQueue, play } from "@/API";
import { Queue } from "@spotify/web-api-ts-sdk";
import { Track } from "@spotify/web-api-ts-sdk";
import { LoadingOutlined } from "@ant-design/icons";

export default function ViewQueue() {
  const [tracks, setTracks] = useState<Track[]>();
  const [currentTrack, setCurrentTrack] = useState<Track>();
  const [loading, setLoading] = useState<boolean>(true);

  // Continuously fetches queue from server
  useEffect(() => {
    const data = getQueue();
    data.then((value: Queue | undefined | boolean) => {
      if (!value) return;
      setTracks((value as Queue).queue as Track[]);
      setCurrentTrack((value as Queue).currently_playing as Track);
      setLoading(false);
    });

    setInterval(() => {
      const data = getQueue();
      data.then((value: Queue | undefined | boolean) => {
        if (!value) return;
        setTracks((value as Queue).queue as Track[]);
        setCurrentTrack((value as Queue).currently_playing as Track);
        if (loading) setLoading(false);
      });
    }, 1000);
  }, []);

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
            </div>
            <div className="mb-4 bg-[#333] rounded-sm">
              <h4 className="font-bold">Currently playing</h4>
              <ViewTrack track={currentTrack as Track} showButton={false} />
            </div>
            {tracks?.map((track: Track, index: number, tracks: Track[]) => (
              <ViewTrack key={index} track={track} showButton={false} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
