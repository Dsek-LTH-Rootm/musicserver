'use client'
import { SearchOutlined } from "@ant-design/icons";
import styles from './browse.module.css';
import View from "./View";
import { search } from "@/API";
import { FormEvent, useRef, useState } from "react";
import ViewQueue from "./ViewQueue";
import { PartialSearchResult } from "@spotify/web-api-ts-sdk";

export interface pickProp {
  props: Pick<PartialSearchResult, "albums" | "playlists" | "tracks">;
}

export default function Browse() {
  const [result, setResult] = useState<Pick<PartialSearchResult, "albums" | "playlists" | "tracks">>();
  const [showSearch, setShowSearch] = useState<boolean>(true);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setShowSearch(true);

    const formData = new FormData(e.currentTarget);
    const searchTerm: string = formData.get("searchTerm") as string;
    if (!searchTerm || searchTerm === "") {
      return;
    }

    const data: any = await search(searchTerm);
    setResult(data);
  }

  return (
    <div className={styles.browseContainer}>
      <div className={styles.tab}>
        <button className={styles.tabButton} type="button" onClick={() => setShowSearch(false)}>Queue</button>
        <button className={styles.tabButton} type="button" onClick={() => setShowSearch(true)}>Search</button>
        <form onSubmit={onSubmit} className={styles.container}>
          <div className={styles.searchContainer}>
            <SearchOutlined className={`${styles.search} ${styles.icon}`} />
            <input type="text" name="searchTerm" className={styles.search} placeholder='Search' />
          </div>
          <button type="submit" className={styles.button}>Search</button>
        </form>
      </div>
      {!showSearch && (
        <ViewQueue show={!showSearch} />
      )}
      {showSearch && (
        <View props={result as Pick<PartialSearchResult, "albums" | "playlists" | "tracks">} />
      )}
    </div>
  );
}