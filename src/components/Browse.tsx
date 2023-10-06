import Search from "./Search";
import View from "./View";
import styles from './browse.module.css';

export default function Browse() {
  return (
    <div className={styles.container}>
      <Search />
      <View />
    </div>
  );
}