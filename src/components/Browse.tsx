'use client'
import { SearchOutlined } from "@ant-design/icons";
import styles from './browse.module.css';
import View from "./View";
import { search } from "@/API";
import { FormEvent, useRef, useState } from "react";
import { searchItem, track } from "@/types";
import ViewTrack from "./view_items/ViewTrack";

export default function Browse() {
  const [result, setResult] = useState<searchItem>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const searchTerm: string = formData.get("searchTerm") as string;
    if (!searchTerm || searchTerm === "") {
      return;
    }

    const data: searchItem = await search(searchTerm);
    setResult(data);
  }

  return (
    <div className={styles.browseContainer}>
      <form onSubmit={onSubmit} className={styles.container}>
        <div className={styles.searchContainer}>
          <SearchOutlined className={`${styles.search} ${styles.icon}`} />
          <input type="text" name="searchTerm" className={styles.search} placeholder='Search' />
        </div>
        <button type="submit" className={styles.button}>Search</button>
      </form>
      <View props={result} />
    </div>
  );
}