'use client'
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import styles from './browse.module.css';
import styles2 from './view.module.css';
import View from "./View";
import { search } from "@/API";
import { FormEvent, useState } from "react";
import ViewQueue from "./ViewQueue";
import { PartialSearchResult } from "@spotify/web-api-ts-sdk";
import { HomeFilled, SignalFilled } from "@ant-design/icons";

export interface pickProp {
  props: Pick<PartialSearchResult, "albums" | "playlists" | "tracks">;
}

export default function Browse() {
  const [result, setResult] = useState<Pick<PartialSearchResult, "albums" | "playlists" | "tracks">>();
  const [tab, setTab] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const searchTerm: string = formData.get("searchTerm") as string;
    if (!searchTerm || searchTerm === "") {
      setLoading(false);
      return;
    }
    
    setTab(2);
    const data: any = await search(searchTerm);
    setResult(data);
    setLoading(false);
  }

  // turn in to hamburger menu if adding more tabs?

  return (
    <div className={styles.browseContainer}>
      <div className={styles.tab}>
        <button className={styles.tabButton} type="button" onClick={() => setTab(0)}><HomeFilled /></button>
        <button className={styles.tabButton} type="button" onClick={() => setTab(1)}><SignalFilled /></button>
        {/* <button className={styles.tabButton} type="button" onClick={() => setShowSearch(true)}>Search</button> */}
        <form onSubmit={onSubmit} className={styles.container}>
          <div className={styles.searchContainer}>
            <input type="text" name="searchTerm" className={styles.search} placeholder='Search' />
            <button type="submit" className={styles.button}>
              <SearchOutlined className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
      {tab === 0 && (
        <p></p>
      )}
      {tab === 1 && (
        <ViewQueue show={tab === 1} />
      )}
      {tab === 2 && (
        <>
          {loading && (
            <div className={styles2.loading}>
              <LoadingOutlined />
            </div>
          )}
          {!loading && (
            <View props={result as Pick<PartialSearchResult, "albums" | "playlists" | "tracks">} />
          )}
        </>
      )}
    </div>
  );
}