"use server";
import { SpotifyApi, AccessToken, PlaybackState } from '@spotify/web-api-ts-sdk';
import { revalidatePath } from 'next/cache';
import { headers } from "next/headers";

var sdk: SpotifyApi;
var active_device: string | null;

export async function getSDK() {
  return sdk;
}

export async function updateAccessToken(accessToken: AccessToken) {
  if (accessToken.access_token === 'emptyAccessToken') {
    console.log("Access token empty");
    return;
  }
  sdk = SpotifyApi.withAccessToken(process.env.CLIENT_ID as string, accessToken);
}

export async function search(query: string) {
  try {
    const response = await sdk?.search(query, ["track", "playlist", "album"]);
    console.log("Searched");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addToQueue(uri: string) {
  try {
    await sdk?.player?.addItemToPlaybackQueue(uri, active_device!);
    console.log("Added to queue");
  } catch (error) {
    activateDevice();
  }
}

export async function skipNext() {
  try {
    await sdk?.player?.skipToNext(active_device!);
    console.log("Skipped next");
  } catch (error) {
    activateDevice();
  }
}

export async function skipBack() {
  try {
    await sdk?.player?.skipToPrevious(active_device!);
    console.log("Skipped back");
  } catch (error) {
    activateDevice();
  }
}

export async function play(context_uri?: string) {
  try {
    if (context_uri) {
      await sdk?.player?.togglePlaybackShuffle(true);
    }
    await sdk.player.startResumePlayback(active_device!, context_uri);
    console.log("Started playing");
  } catch (error) {
    activateDevice();
  }
}

export async function pause() {
  try {
    await sdk.player.pausePlayback(active_device!);
    console.log("Paused");
  } catch (error) {
    activateDevice();
  }
}

async function activateDevice() {
  const response = await sdk?.player?.getAvailableDevices();
  console.log(response);
  response.devices.forEach(async element => {
    const device_ids = [
      element?.id
    ];
    const play = true;
    await sdk?.player?.transferPlayback(device_ids as string[], true);
    console.log("Found device " + element.id);
    active_device = element.id;
  });

}

// https://github.com/vercel/next.js/discussions/54075
export async function getQueue() {
  try {
    headers();
    const response = await sdk?.player?.getUsersQueue();
    console.log("Got queue");
    return response;
  } catch (error) {
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

// stop clients from making individual requests and let the server do 1 request for all clients every x seconds
var playback: PlaybackState;
var timeSinceFetch: number = 0;

export async function getCurrentStatus() {
  try {
    headers();
    // Date.now() returns milliseconds
    if (Date.now() - timeSinceFetch > 5000 || playback === undefined) {
      playback = await sdk?.player?.getCurrentlyPlayingTrack();
      if (playback === null) {
        activateDevice();
      }
      timeSinceFetch = Date.now();
    }

    return playback;
  } catch (error) {
    console.log("Device not activated");
    // activateDevice();
  }
}