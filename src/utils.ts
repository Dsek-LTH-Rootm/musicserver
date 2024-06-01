"use server";
import { promises as fs } from "fs";
import { Settings } from "./types";

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
export async function getSettings() {
  try {
    const file = await fs.readFile(process.cwd() + "/settings.json", "utf8");
    const settings: Settings = JSON.parse(file);
    return settings;
  } catch (err: any) {
    // If failed, and probably due to there not being a setting file previously, create a new one
    if (err.code === "ENOENT") {
      log("Settings file not found, creating a new one");
      await fs
        .writeFile(
          process.cwd() + "/settings.json",
          JSON.stringify({
            votingEnabled: null,
            enableGuests: null,
            requireAccount: null,
            bannedUsers: [],
            enableAdminRoles: [],
          }),
          "utf8"
        )
        .catch((err) => {
          console.log(err);
        });
      return getSettings();
    }
  }
}

export async function updateSettings(updatedSettings: Settings) {
  await fs.writeFile(
    process.cwd() + "/settings.json",
    JSON.stringify(updatedSettings),
    "utf8"
  );
}
