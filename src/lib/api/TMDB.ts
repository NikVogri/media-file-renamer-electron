import axios from 'axios';
import {
  EpisodeAdditionalData,
  MovieAdditionalData,
  TmdbEpisodeResponse,
  TmdbMovieResponse,
  TmdbTVResponse,
  TVAdditionalData,
} from '../tsDefinitions';
import { tmdbRootApiUrl } from '../../constants/urls';

export class TMDBApi {
  private rootUrl: string = tmdbRootApiUrl;

  constructor(private apiKey: string) {}

  public async getTVSeasonData(
    id: number | string,
    season: number
  ): Promise<EpisodeAdditionalData[]> {
    const url = `${this.rootUrl}tv/${id}/season/${season}?api_key=${this.apiKey}`;

    try {
      const { data } = await axios.get(url);
      return this.normalizeEpisodeData(data.episodes);
    } catch (err) {
      console.log(err);
      throw new Error('Tv show data could not be fetched');
    }
  }

  public async getTVShowId(title: string): Promise<TVAdditionalData[]> {
    const url = `${this.rootUrl}search/tv?api_key=${this.apiKey}&query=${title}`;
    try {
      const { data } = await axios.get(url);
      return this.normalizeTVData(data.results);
    } catch (err) {
      console.log(err);
      throw new Error('Tv show ID could not be fetched');
    }
  }

  public getMovieData = async (
    title: string
  ): Promise<MovieAdditionalData[]> => {
    const url = `${this.rootUrl}search/movie?api_key=${this.apiKey}&query=${title}`;
    try {
      const { data } = await axios.get(url);

      return this.normalizeMovieData(data.results);
    } catch (err) {
      console.log(err);
      throw new Error('Movie data could not be fetched');
    }
  };

  private normalizeEpisodeData = (
    results: TmdbEpisodeResponse[]
  ): EpisodeAdditionalData[] =>
    results.map((d: TmdbEpisodeResponse) => ({
      episode: d.episode_number,
      episodeTitle: d.name,
      season: d.season_number,
      year: Number(d.air_date.slice(0, 4)),
    }));

  private normalizeTVData = (results: TmdbTVResponse[]): TVAdditionalData[] =>
    results.map((d: TmdbTVResponse) => ({
      id: d.id,
      title: d.name,
      year: Number(d.first_air_date.slice(0, 4)),
      posterPath: d.poster_path,
    }));

  private normalizeMovieData = (
    results: TmdbMovieResponse[]
  ): MovieAdditionalData[] =>
    results.map((d: TmdbMovieResponse) => ({
      id: d.id,
      title: d.title,
      year: Number(d.release_date.slice(0, 4)),
      posterPath: d.poster_path,
    }));
}
