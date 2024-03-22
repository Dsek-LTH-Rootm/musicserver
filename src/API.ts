"use server";
import {
  SpotifyApi,
  AccessToken,
  PlaybackState,
} from "@spotify/web-api-ts-sdk";
import { execSync } from "child_process";
import { headers } from "next/headers";
import type { Queue } from "@spotify/web-api-ts-sdk";
import { log } from "./utils";

let sdk: SpotifyApi | undefined;
let active_device: string | null;
let lastCalls = new Map<string, number>();

export async function updateAccessToken(accessToken: AccessToken) {
  if (accessToken.access_token === "emptyAccessToken") {
    log("Access token empty");
    return;
  }
  sdk = SpotifyApi.withAccessToken(
    process.env.CLIENT_ID as string,
    accessToken
  );
}

export async function removeAccessToken() {
  sdk?.logOut();
  sdk = undefined;
}

export async function search(query: string) {
  try {
    const response = await sdk?.search(query, ["track", "playlist", "album"]);
    log("Searched");
    return response;
  } catch (error: any) {
    if (error.status == 400) return;
    console.log(error);
  }
}

export async function addToQueue(uri: string) {
  try {
    await sdk?.player?.addItemToPlaybackQueue(uri, active_device!);
    log("Added to queue");
  } catch (error: any) {
    if (error.status == 400) return;
    activateDevice();
  }
}

export async function skipNext() {
  try {
    await sdk?.player?.skipToNext(active_device!);
    log("Skipped next");
  } catch (error: any) {
    if (error.status == 400) return;
    activateDevice();
  }
}

export async function skipBack() {
  try {
    await sdk?.player?.skipToPrevious(active_device!);
    log("Skipped back");
  } catch (error: any) {
    if (error.status == 400) return;
    activateDevice();
  }
}

export async function play(context_uri?: string, shuffle?: boolean) {
  try {
    await sdk?.player.startResumePlayback(active_device!, context_uri);
    if (context_uri && shuffle) {
      // need to turn off and on shuffle for spotify to shuffle
      await sdk?.player?.togglePlaybackShuffle(true);
    } else {
      await sdk?.player?.togglePlaybackShuffle(false);
    }
    lastCalls.set("queue", 0);
    log("Started playing with shuffle: " + shuffle);
  } catch (error: any) {
    if (error.status == 400) return;
    activateDevice();
  }
}

export async function pause() {
  try {
    await sdk?.player.pausePlayback(active_device!);
    log("Paused");
  } catch (error: any) {
    if (error.status == 400) return;
    activateDevice();
  }
}

async function activateDevice() {
  if ((await sdk?.getAccessToken()) == null) return;
  const response = await sdk?.player?.getAvailableDevices();
  console.log(response);
  response?.devices.forEach(async (element) => {
    const device_ids = [element?.id];
    const play = true;
    await sdk?.player?.transferPlayback(device_ids as string[], true);
    log("Found device " + element.id);
    active_device = element.id;
  });
}

let queue: Queue | undefined;
export async function getQueue() {
  try {
    headers();
    const q = lastCalls.get("queue");
    if ((q && Date.now() - q > 10000) || !q) {
      queue = await sdk?.player?.getUsersQueue();
      lastCalls.set("queue", Date.now());
      log("Got queue");
    }
    return queue;
  } catch (error: any) {
    if (error.status == 400) return;
    console.log(error);
  }
}

export async function getAccessToken() {
  if (sdk === undefined) {
    return null;
  } else {
    return await sdk.getAccessToken();
  }
}

var playback: PlaybackState | undefined;
export async function getCurrentStatus() {
  try {
    headers();
    const s = lastCalls.get("status");
    if ((s && Date.now() - s > 10000) || !s) {
      playback = await sdk?.player?.getCurrentlyPlayingTrack();
      lastCalls.set("status", Date.now());
    }

    return playback;
  } catch (error: any) {
    if (error.status == 400) return;
    log("Device not activated");
  }
}

export async function poll() {
  try {
    headers();
    await sdk?.player?.getPlaybackState();
  } catch (error: any) {
    if (error.status == 400) return;
    log("Can't poll");
  }
}

export async function setVolume(value: number) {
  try {
    execSync(`pactl set-sink-volume @DEFAULT_SINK@ ${value}%`);
  } catch (error) {
    log("Volume set failed");
  }
}

export async function getVolume() {
  try {
    const result = execSync(
      "pactl list sinks | grep '^[[:space:]]Volume:' | head -n $(( $SINK + 1 )) | tail -n 1 | sed -e 's,.* \\([0-9][0-9]*\\)%.*,\\1,'"
    ).toString();
    return result;
  } catch (error) {
    log("Couldn't get volume");
  }
}
