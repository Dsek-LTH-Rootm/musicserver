import { getAccessToken } from "@/API";
import styles from "./page.module.css";
import Browse from "@/components/Browse";
import Player from "@/components/Player";
import { ToastContainer } from "@/components/ToastContainer";

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
      <Browse />
      <Player />
      <ToastContainer />
    </main>
  );
}
