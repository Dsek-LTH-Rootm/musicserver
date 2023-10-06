import Search from '@/components/Search'
import styles from './page.module.css'
import Player from '@/components/Player'
import Browse from '@/components/Browse'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Music server</h1>
      </div>
      <Browse />
      <Player />
    </main>
  )
}
