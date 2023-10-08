'use client'

import { getAccessToken, updateAccessToken } from "@/API";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react"

export default function Auth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    getAccessToken().then((value: AccessToken | null) => {
      if (value === null) {
        SpotifyApi.performUserAuthorization("f6c2c310440440ada66232669bb965b6", "http://localhost:3000", ["user-read-playback-state", "user-read-private", "user-modify-playback-state", "user-read-currently-playing", "app-remote-control", "streaming", "playlist-read-private", "playlist-read-collaborative", "playlist-modify-private", "playlist-modify-public", "user-top-read", "user-read-recently-played", "user-library-modify", "user-library-read"], (accessToken) => updateAccessToken(accessToken));
        setAuthenticated(true);
      }
    });
  }, []);

  return (
    <div>
      {!authenticated && (
        <p>
          Auth pls.
        </p>
      )}
    </div>
  )
}