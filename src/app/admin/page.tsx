import { getAccessToken, removeAccessToken } from "@/API";
import SpotifyAuth from "@/components/SpotifyAuth";
import { getClientID, getRedirectUri } from "@/utils";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";

export default function AdminPage() {
  return (
    <main className="*:text-white flex flex-col justify-center items-center h-screen">
      <h1>Welcome to the admin page</h1>
      <h2>Settings:</h2>
      <h2>Modes:</h2>
      <SpotifyAuth />
      <form action={removeAccessToken}>
        <button
          type="submit"
          className="bg-red-600 p-2 transform transition hover:scale-105 box-border"
        >
          Logout of spotify
        </button>
      </form>
    </main>
  );
}
