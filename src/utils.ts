"use server";
import { promises as fs } from "fs";
import { Settings } from "./types";

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
            votingEnabled: "false",
            enableGuests: "false",
            requireAccount: "false",
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
