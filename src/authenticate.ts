"use server";
import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import { stringify } from "querystring";
import fs from 'fs';

const redirect_uri = "http://localhost:3000";

interface accessTokenResponse {
  access_token: string;
  expires_in: number;
  "not-before-policy": number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

interface storingTokens {
  access_token: string;
  refresh_token: string;
}

export async function authenticate() {
  const state = crypto.randomBytes(8).toString('hex');
  const scope = "user-read-playback-state user-read-private user-modify-playback-state user-read-currently-playing app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public user-top-read user-read-recently-played user-library-modify user-library-read"

  return ("https://accounts.spotify.com/authorize?" + stringify({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  }));
}

export async function getAccessToken(code: string) {
  try {
    const encode = (str: string) => Buffer.from(str);
    const auth = encode(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64");

    const response: void | AxiosResponse = await axios.post("https://accounts.spotify.com/api/token", {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
      {
        headers: {
          "Authorization": "Basic " + auth,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else if (error.message) {
          console.error(error.message);
        }

        if (error.config) {
          console.error(error.config);
        }

        return;
      });

    const responseData: accessTokenResponse = (response as AxiosResponse).data;

    const accessToken = responseData.access_token;

    const read = fs.readFileSync("token.txt", "utf8");
    const json: storingTokens = JSON.parse(read);
    json.access_token = accessToken;
    fs.writeFileSync("token.txt", JSON.stringify(json));

    console.log(accessToken);

    return accessToken;

  } catch (err) {
    console.log(err);
  }
}

export async function getRefreshToken() {
  const encode = (str: string) => Buffer.from(str);
  const auth = encode(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64");

  const getrefresh = fs.readFileSync("token.txt", "utf8");
  const refreshjson: storingTokens = JSON.parse(getrefresh);


  const response: void | AxiosResponse = await axios.post("https://accounts.spotify.com/api/token", {
    grant_type: "refresh_token",
    refresh_token: refreshjson.refresh_token
  },
    {
      headers: {
        "Authorization": "Basic " + auth,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).catch((error) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        console.error(error.request);
      } else if (error.message) {
        console.error(error.message);
      }

      if (error.config) {
        console.error(error.config);
      }

      return;
    });

  const responseData: accessTokenResponse = (response as AxiosResponse).data;

  const refreshToken = responseData.refresh_token;
  const read = fs.readFileSync("token.txt", "utf8");
  const json: storingTokens = JSON.parse(read);
  json.refresh_token = refreshToken;
  fs.writeFileSync("token.txt", JSON.stringify(json));

  console.log(refreshToken);

  return refreshToken;
}

export async function apiCall() {
  const read = fs.readFileSync("token.txt", "utf8");
  const json: storingTokens = JSON.parse(read);
  return json.access_token;
}