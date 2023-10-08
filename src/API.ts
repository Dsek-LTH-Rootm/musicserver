"use server"
import { AccessToken, SpotifyApi } from '@spotify/web-api-ts-sdk';

var sdk: SpotifyApi;

export async function updateAccessToken(accessToken: AccessToken) {
  sdk = SpotifyApi.withAccessToken("client-id", accessToken);
}

export async function search(query: string) {
  try {
    const response = await sdk.search(query, ["track", "playlist", "album"]);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function addToQueue(uri: string) {
  try {
    await sdk.player.addItemToPlaybackQueue(uri);
  } catch (error) {
    activateDevice();
    addToQueue(uri);
  }
}

export async function skipNext() {
  try {
    await sdk.player.skipToNext("");
  } catch (error) {
    activateDevice();
  }
}

export async function skipBack() {
  try {
    await sdk.player.skipToPrevious("");
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
  } catch (error) {
    activateDevice();
  }
}

export async function pause() {
  try {
    await sdk.player.pausePlayback("");
  } catch (error) {
    activateDevice();
  }
}

async function activateDevice() {
  const response = await sdk.player.getAvailableDevices();
  response.devices.forEach(element => {
    if (!element.is_active) {
      const devices = [
        element.id
      ];
      sdk.player.transferPlayback(devices as string[], true);
    }
  });
}

export async function getQueue() {
  try {
    const response = await sdk.player.getUsersQueue();
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccessToken() {
  return sdk.getAccessToken();
}