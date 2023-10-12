import { useEffect, useState } from "react";
import Player from "./Player";
import { PlaybackState } from "@spotify/web-api-ts-sdk";
import { getCurrentStatus } from "@/API";

export default function PlayerWrapper() {

  var data: PlaybackState | undefined;
  setInterval(async () => {
    data = await getCurrentStatus();
    console.log(data);
    if (data === undefined) {
      console.log("Couldn't get current status");
    }
  }, 15000);

  return (
    <Player props={data as PlaybackState} />
  );
}