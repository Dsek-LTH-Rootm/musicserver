import styles from './page.module.css'
import Browse from '@/components/Browse'
import Auth from '@/components/Auth';
import Player from '@/components/Player';
import Image from 'next/image';


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Image src='/sigill-adobe-garamond.png' alt='D-sek logo' width='64' height='64'/>
        <h1>thoven</h1>
      </div>
      <Browse />
      <Player />
      <Auth />
    </main >
  )
}
