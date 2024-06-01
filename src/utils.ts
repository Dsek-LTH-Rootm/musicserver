"use server";

import { addToQueue, play } from "./API";

export async function log(message: string) {
  console.log(new Date().toUTCString() + ": " + message);
}

export async function getClientID() {
  log("Retrieving client id: " + process.env.CLIENT_ID);
  return process.env.CLIENT_ID as string;
}

export async function getRedirectUri() {
  if (process.env.DEV_BASE_URL) {
    log("Retrieving dev redirect uri: " + process.env.DEV_BASE_URL);
    return process.env.DEV_BASE_URL as string;
  }

  log("Retrieving redirect uri: " + process.env.BASE_URL);
  return process.env.BASE_URL as string;
}

export const addToQueueHandler = async (prevState: any, formData: FormData) => {
  "use server";
  const uri = formData.get("uri");
  if (!uri) return { success: false };
  addToQueue(uri.toString());
  return {
    success: true,
  };
};

export const playHandler = async (prevState: any, formData: FormData) => {
  "use server";
  const uri = formData.get("uri");
  const shuffle = formData.get("shuffle");
  if (!uri || !shuffle) return { success: false };
  play(uri.toString(), shuffle.toString() == "1");
  return {
    success: true,
  };
};
