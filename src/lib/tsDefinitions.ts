export enum MovingStep {
  none,
  loading,
  success,
  fail,
}
export interface MovingFile {
  name: string;
  place: number;
}

export enum Icon {
  rename = 'rename',
  settings = 'settings',
}

export interface TVEpisode {
  title: string;
  episodeNumber: number;
  image?: string;
}

export interface TVData {
  title?: string;
  episode?: number;
  season?: number;
  year?: number;
  episodeTitle?: string;
}
export interface MovieData {
  title: string;
  year?: number;
}

export enum ContentType {
  tv = 'tv',
  movie = 'movie',
}

export type FileData = TVData & MovieData;

export interface TmdbTVResponse {
  id: number;
  name: string;
  original_name: string;
  backdrop_path?: string;
  poster_path?: string;
  first_air_date: string;
}

export interface TmdbMovieResponse {
  id: number;
  title: string;
  original_title?: string;
  backdrop_path?: string;
  poster_path?: string;
  release_date: string;
}

export interface TmdbEpisodeResponse {
  air_date: string;
  episode_number: number;
  season_number: 1;
  name: string;
  overview: string;
}

export interface MovieAdditionalData {
  id: number;
  title: string;
  originalTitle?: string;
  year: number;
}

export interface EpisodeAdditionalData {
  season: number;
  year: number;
  episode: number;
  episodeTitle: string;
}

export interface TVAdditionalData {
  id: number;
  title: string;
  year: number;
}

export interface BasicSettings {
  tvTemplate: string;
  movieTemplate: string;
  movieSelectedDrive: string;
  tvSelectedDrive: string;
  tmdbApiKey: string;
}
