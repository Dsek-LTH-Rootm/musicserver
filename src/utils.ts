"use server";

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
