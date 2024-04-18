"use server";

import axios from "axios";
import { verify } from "jsonwebtoken";
import { getSettings } from "./utils";

export async function permission(
  guest: string | undefined,
  jwt: string | undefined
) {
  const settings = await getSettings();

  // If no account is required, allow everyone
  if (!settings?.requireAccount) return true;
  console.log(jwt);
  console.log(await auth(jwt as string));
  if (jwt && (await auth(jwt))) {
    console.log("OK PERMS ACCOUNT");
    return true;
  } else if (settings.enableGuests && guest && guest.length > 4) {
    return true;
  }

  return false;
}

export async function auth(jwt: string) {
  try {
    verify(jwt, await getPublicKey(), {
      algorithms: ["RS256"],
    });
    return true;
  } catch (err) {
    return false;
  }
}

async function getPublicKey() {
  const response = await axios.get(
    `${process.env.KEYCLOAK_BASE_URL}realms/${process.env.KEYCLOAK_REALM}`
  );
  const public_key =
    (("-----BEGIN PUBLIC KEY-----\n" + response.data.public_key) as string) +
    "\n-----END PUBLIC KEY-----";
  return public_key;
}
