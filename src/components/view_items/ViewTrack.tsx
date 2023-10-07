import { track } from "@/types";
import styles from './viewitem.module.css';
import { useEffect } from "react";

export default function ViewTrack(track: any) {
  return (
    <div>
      <p>({track.track.name})</p>
    </div>
  );
}