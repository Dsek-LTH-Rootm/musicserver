import { removeAccessToken } from "@/API";
import SpotifyAuth from "@/components/SpotifyAuth";

export default function AdminPage() {
  return (
    <main className="flex h-screen flex-col items-center *:text-white">
      <div className="w-1/3 *:text-xl">
        <h1 className="mb-4 text-center !text-3xl">
          Welcome to the admin page
        </h1>
        <SpotifyAuth />
        <form action={removeAccessToken} className="mt-3">
          <button
            type="submit"
            className="box-border w-full transform bg-red-600 p-2 transition hover:scale-105"
          >
            Logout of spotify
          </button>
        </form>
      </div>
    </main>
  );
}
