"use server";
import {
  SpotifyApi,
  AccessToken,
  PlaybackState,
} from "@spotify/web-api-ts-sdk";
import { execSync } from "child_process";
import { cookies, headers } from "next/headers";
import type { Queue } from "@spotify/web-api-ts-sdk";
import { log } from "./utils";
import { redirect } from "next/navigation";
import { permission } from "./auth";

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

  log("Logged in to spotify");
  redirect("/");
}

export async function removeAccessToken() {
  sdk?.logOut();
  sdk = undefined;
  log("Logged out of spotify");
  redirect("/");
}

export async function search(query: string) {
  try {
    const response = await sdk?.search(query, ["track", "playlist", "album"]);
    log("Searched for " + query);
    return response;
  } catch (error: any) {
    console.log(error);
  }
}

export async function addToQueue(uri: string) {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    await sdk?.player?.addItemToPlaybackQueue(uri, active_device!);
    log("Added to queue");
    return true;
  } catch (error: any) {
    console.log(error);
    activateDevice();
  }
}

export async function skipNext() {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    await sdk?.player?.skipToNext(active_device!);
    log("Skipped next");
    return true;
  } catch (error: any) {
    activateDevice();
  }
}

export async function skipBack() {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    await sdk?.player?.skipToPrevious(active_device!);
    log("Skipped back");
    return true;
  } catch (error: any) {
    activateDevice();
  }
}

export async function play(context_uri?: string, shuffle?: boolean) {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    await sdk?.player.startResumePlayback(active_device!, context_uri);
    if (context_uri && shuffle) {
      // need to turn off and on shuffle for spotify to shuffle
      await sdk?.player?.togglePlaybackShuffle(true);
    } else {
      await sdk?.player?.togglePlaybackShuffle(false);
    }
    lastCalls.set("queue", 0);
    log("Started playing with shuffle turned " + shuffle);
    return true;
  } catch (error: any) {
    activateDevice();
  }
}

export async function pause() {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    await sdk?.player.pausePlayback(active_device!);
    log("Paused");
    return true;
  } catch (error: any) {
    activateDevice();
  }
}

async function activateDevice() {
  if ((await sdk?.getAccessToken()) == null) return false;
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
    if (!sdk) return false;
    headers();
    const q = lastCalls.get("queue");
    if ((q && Date.now() - q > 10000) || !q) {
      queue = await sdk?.player?.getUsersQueue();
      lastCalls.set("queue", Date.now());
      log("Got queue");
    }
    return queue;
  } catch (error: any) {
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
    if (!sdk) return false;
    headers();
    const s = lastCalls.get("status");
    if ((s && Date.now() - s > 10000) || !s) {
      playback = await sdk?.player?.getCurrentlyPlayingTrack();
      lastCalls.set("status", Date.now());
      log("Got playback state");
    }

    return playback;
  } catch (error: any) {
    log("Device not activated");
  }
}

export async function setVolume(value: number) {
  try {
    if (
      !(await permission(
        cookies().get("user")?.value,
        cookies().get("jwt")?.value
      ))
    )
      return false;
    execSync(`pactl set-sink-volume @DEFAULT_SINK@ ${value}%`);
    return true;
  } catch (error) {
    log("Volume set failed");
    return false;
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
    return false;
  }
}
