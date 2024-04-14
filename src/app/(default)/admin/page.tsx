import { getAccessToken, removeAccessToken } from "@/API";
import SpotifyAuth from "@/components/SpotifyAuth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const spotifyLoggedIn = await getAccessToken();

  return (
    <main className="flex h-screen flex-col items-center *:text-white">
      <div className="w-full sm:w-1/3 *:text-xl">
        <h1 className="mb-4 text-center !text-3xl">Settings</h1>
        {!cookies().get("accessToken")?.value &&
          cookies().get("user")?.value && (
            <form
              action={async () => {
                "use server";
                redirect("/login?guest=true");
              }}
              className="mb-3"
            >
              <button
                type="submit"
                className="box-border w-full transform bg-green-600 p-2 transition hover:scale-105"
              >
                Login to account
              </button>
            </form>
          )}
        {!spotifyLoggedIn?.access_token && <SpotifyAuth />}
        {spotifyLoggedIn?.access_token && (
          <form action={removeAccessToken} className="mt-3">
            <button
              type="submit"
              className="box-border w-full transform bg-red-600 p-2 transition hover:scale-105"
            >
              Logout of spotify
            </button>
          </form>
        )}
      </div>
    </main>
  );
}