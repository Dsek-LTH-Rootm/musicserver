import styles from './page.module.css'
import Player from '@/components/Player'
import Browse from '@/components/Browse'
import Auth from '@/components/Auth';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Music server</h1>
      </div>
      <Browse />
      <Player />
      <Auth />
    </main >
  )
}
