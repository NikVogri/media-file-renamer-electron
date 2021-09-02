export interface SettingsState {
  movieTemplate: string;
  tvTemplate: string;
  foundDrives: string[];
  tvSelectedDrive: string;
  movieSelectedDrive: string;
  tmdbApiKey: string;
}

const initState: SettingsState = {
  movieTemplate: 'movies/{title}/{title} - {year}',
  tvTemplate: 'tv/{title}/{title} - S{season}E{episode} - {episodeTitle}',
  foundDrives: [],
  tvSelectedDrive: '',
  movieSelectedDrive: '',
  tmdbApiKey: '',
};

export default initState;
