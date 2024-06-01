"use client";
import styles from "../view.module.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import { useFormState } from "react-dom";
import { addToQueueHandler } from "@/utils";
import { useEffect } from "react";
import { Toast } from "../Toast";

export default function ViewTrack({
  track,
  showButton,
}: {
  track: Track;
  showButton?: boolean;
}) {
  const [state, formAction] = useFormState(addToQueueHandler, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      Toast.add("Track added to queue");
    }
  }, [state]);

  return (
    <div className={styles.smallContainer}>
      {showButton !== false && (
        <form action={formAction}>
          <input type="hidden" name="uri" value={track?.uri} />
          <button type="submit" className={styles.button}>
            <PlusCircleFilled className="justify-center" />
          </button>
        </form>
      )}
      <a
        className={styles.cover}
        target="_blank"
        href={track?.album?.external_urls?.spotify}
      >
        <Image
          fill={true}
          sizes="50px"
          alt="Song's album cover art"
          src={track?.album?.images[0]?.url}
          className={styles.cover}
        />
      </a>
      <a
        href={track?.external_urls?.spotify}
        target="_blank"
        className={styles.title}
      >
        {track?.name}
      </a>
      <div className={styles.artist}>
        {track?.artists?.map(
          (
            artist: SimplifiedArtist,
            index2: number,
            artists: SimplifiedArtist[]
          ) => (
            <GetArtist
              key={index2}
              artist={artist}
              index={index2}
              artists={artists}
            />
          )
        )}
      </div>
      <p className={styles.duration}>{getTime(track?.duration_ms)}</p>
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

export function GetArtist({
  artist,
  index,
  artists,
}: {
  artist: SimplifiedArtist;
  index: number;
  artists: SimplifiedArtist[];
}) {
  if (index == artists.length - 1) {
    return (
      <p>
        {" "}
        <a
          href={artist?.external_urls?.spotify}
          target="_blank"
          key={index}
          className={styles.artistlink}
        >
          {artist.name}
        </a>{" "}
      </p>
    );
  } else {
    return (
      <p>
        {" "}
        <a
          href={artist?.external_urls?.spotify}
          target="_blank"
          key={index}
          className={styles.artistlink}
        >
          {artist.name}
        </a>
        &nbsp;-&nbsp;
      </p>
    );
  }
}
