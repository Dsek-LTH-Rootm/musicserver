'use-client';
import styles from './search.module.css';
import { SearchOutlined } from '@ant-design/icons';

export default function Search() {
  const search = e => {
    e.preventDefault();
    console.log("searching");
  }

  return (
    <form onSubmit={search} className={styles.container}>
      <div className={styles.searchContainer}>
        <SearchOutlined className={`${styles.search} ${styles.icon}`} />
        <input type="text" className={styles.search} placeholder='Search' />
      </div>
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
}