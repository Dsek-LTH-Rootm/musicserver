"use server"
import { SpotifyApi, AccessToken } from '@spotify/web-api-ts-sdk';

var sdk: SpotifyApi;
var active_device: string | null;

export async function updateAccessToken(accessToken: AccessToken) {
  console.log(accessToken);
  sdk = SpotifyApi.withAccessToken("f6c2c310440440ada66232669bb965b6", accessToken);
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
    await sdk.player.addItemToPlaybackQueue(uri, active_device!);
    console.log("Added to queue");
  } catch (error) {
    activateDevice();
  }
}

export async function skipNext() {
  try {
    await sdk.player.skipToNext(active_device!);
    console.log("Skipped next");
  } catch (error) {
    activateDevice();
  }
}

export async function skipBack() {
  try {
    await sdk.player.skipToPrevious(active_device!);
    console.log("Skipped back");
  } catch (error) {
    activateDevice();
  }
}

export async function play(context_uri?: string) {
  try {
    if (context_uri) {
      await sdk.player.togglePlaybackShuffle(true);
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
  const response = await sdk.player.getAvailableDevices();
  response.devices.forEach(element => {
    const devices = [
      element.id
    ];
    sdk.player.transferPlayback(devices as string[], true);
    console.log("Found device " + element.id);
    active_device = element.id;
  });

}

export async function getQueue() {
  try {
    const response = await sdk.player.getUsersQueue();
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

export async function getCurrentStatus() {
  try {
    const response = await sdk?.player.getCurrentlyPlayingTrack();
    console.log(response);
    return response;
  } catch (error) {
    activateDevice();
  }
}