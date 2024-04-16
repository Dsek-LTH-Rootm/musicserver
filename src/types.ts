import {
  ExternalUrls,
  Followers,
  UserReference,
  Image,
} from "@spotify/web-api-ts-sdk";

export interface image {
  url: string;
  height: number;
  width: number;
}

export interface playlistOwner {
  external_urls: external_urls;
  // followers: Object;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface playlistTracks {
  href: string;
  total: number;
}

export interface simplifiedPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: external_urls;
  href: string;
  id: string;
  images: image[];
  name: string;
  owner: playlistOwner;
  public: boolean;
  snapshot_id: string;
  tracks: playlistTracks;
  type: string;
  uri: string;
}

export interface artist {
  external_urls: external_urls;
  // followers: Object;
  genres: string[];
  href: string;
  id: string;
  images: image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface simplifiedArtist {
  external_urls: external_urls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: external_urls;
  href: string;
  id: string;
  images: image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  // restrictions: Object;
  type: string;
  uri: string;
  artists: simplifiedArtist[];
}

export interface track {
  album: album;
  artists: artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  // external_ids: Object;
  external_urls: external_urls;
  href: string;
  id: string;
  is_playable: boolean;
  // linked_from: Object;
  // restrictions: Object;
  name: string;
  popularity: number;
  // preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface playlistItem {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: simplifiedPlaylist[];
}

export interface artistItem {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: artist[];
}

export interface albumItem {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: album[];
}

export interface trackItem {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: track[];
}

export interface searchItem {
  tracks?: trackItem | undefined;
  albums?: albumItem | undefined;
  playlists?: playlistItem | undefined;
}

export interface external_urls {
  spotify: string;
}

export interface songQueue {
  currently_playing: track;
  queue: track[];
}

export interface PlaylistBase {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: UserReference;
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  type: string;
  uri: string;
}

export interface userinfo {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  "allowed-origins": [string];
  scope: string;
  sid: string;
  email_verified: boolean;
  group_list: [string];
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export interface Settings {
  votingEnabled: boolean;
  guestsOrAccountsOnly: boolean;
  accountsOnly: boolean;
  banned_users: string[];
  admin_roles: string[];
}
