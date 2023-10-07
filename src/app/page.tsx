'use client';
import styles from './page.module.css'
import Player from '@/components/Player'
import Browse from '@/components/Browse'
import { authenticate, getAccessToken } from '@/authenticate';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("code")) {
      getAccessToken(params.get("code") as string);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button type="button" onClick={async () => router.push(await authenticate() as string)}>Sign in</button>
        <h1>Music server</h1>
      </div>
      <Browse />
      <Player />
    </main >
  )
}
