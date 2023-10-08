"use server"
import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';

var sdk: SpotifyApi;

export async function updateAccessToken(accessToken: AccessToken) {
  sdk = SpotifyApi.withAccessToken("client-id", accessToken);
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
    await sdk.player.addItemToPlaybackQueue(uri);
    console.log("Added to queue");
  } catch (error) {
    activateDevice();
  }
}

export async function skipNext() {
  try {
    await sdk.player.skipToNext("");
    console.log("Skipped next");
  } catch (error) {
    activateDevice();
  }
}

export async function skipBack() {
  try {
    await sdk.player.skipToPrevious("");
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
    await sdk.player.startResumePlayback("", context_uri);
    console.log("Started playing");
  } catch (error) {
    activateDevice();
  }
}

export async function pause() {
  try {
    await sdk.player.pausePlayback("");
    console.log("Paused");
  } catch (error) {
    activateDevice();
  }
}

async function activateDevice() {
  const response = await sdk.player.getAvailableDevices();
  console.log(response);
  response.devices.forEach(element => {
    const devices = [
      element.id
    ];
    sdk.player.transferPlayback(devices as string[], true);
    console.log("Found device");
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