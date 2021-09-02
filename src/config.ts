export const ALLOWED_FILE_TYPES = ['video/x-matroska', 'video/mp4'];
export const MAPPABLE_STRINGS = [
  '{title}',
  '{year}',
  '{pSeason}',
  '{season}',
  '{pEpisode}',
  '{episode}',
  '{episodeTitle}',
];
export const REQUIRED_FILE_DATA = {
  movie: ['title', 'year'],
  tv: ['episodeTitle', 'episode', 'season', 'year', 'title'],
};
