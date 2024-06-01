import { getAccessToken } from "@/API";
import styles from "./page.module.css";
import Player from "@/components/Player";
import ViewQueue from "@/components/ViewQueue";

export default async function Home() {
  const accesToken = await getAccessToken();
  if (accesToken == null) {
    return (
      <main className="flex items-center justify-center">
        <h1 className="">Spotify session not activated! Contact admin!</h1>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <ViewQueue />
      <Player />
    </main>
  );
}
