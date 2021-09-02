import { SettingsState } from '../../redux/state/settingsState';
import { TMDBApi } from './TMDB';

export const GetApi = (settings: SettingsState) => {
  switch (true) {
    case !!settings.tmdbApiKey:
      return new TMDBApi(settings.tmdbApiKey);

    default:
      throw new Error('No api keys added');
  }
};
