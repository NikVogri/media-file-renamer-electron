import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectedDrives } from '../../lib/systemHelper';
import { BasicSettings, ContentType } from '../../lib/tsDefinitions';
import {
  setBasicSettings,
  setFoundDrives,
  setSelectedDrive,
} from '../../redux/actions/settingsActtionsCreator';
import { RootState } from '../../redux/store';
import FormatInput from '../FormatInput/FormatInput';

import styles from './SettingsForm.module.scss';

const SettingsForm: React.FC = () => {
  const dispatch = useDispatch();

  const tvSelectedDrive = useSelector(
    (state: RootState) => state.settings.tvSelectedDrive
  );

  const movieSelectedDrive = useSelector(
    (state: RootState) => state.settings.movieSelectedDrive
  );
  const tvTemplate = useSelector(
    (state: RootState) => state.settings.tvTemplate
  );

  const movieTemplate = useSelector(
    (state: RootState) => state.settings.movieTemplate
  );

  const foundDrives = useSelector(
    (state: RootState) => state.settings.foundDrives
  );

  const tmdbApiKey = useSelector(
    (state: RootState) => state.settings.tmdbApiKey
  );

  const [tvPathTemplate, setTvPathTemplate] = useState(tvTemplate);
  const [moviePathTemplate, setMoviePathTemplate] = useState(movieTemplate);
  const [tvSelectedDisk, setTvSelectedDisk] = useState(tvSelectedDrive);
  const [movieSelectedDisk, setMovieSelectedDisk] = useState(
    movieSelectedDrive
  );

  const [TMDBApiKey, setTMDBApiKey] = useState(tmdbApiKey);

  const fetchLocalDisks = useCallback(async () => {
    const connectedDrives = await getConnectedDrives();

    dispatch(setFoundDrives(connectedDrives));
  }, [dispatch]);

  useEffect(() => {
    if (!foundDrives.length) {
      fetchLocalDisks();
    }

    if (!tvSelectedDrive && foundDrives.length > 0) {
      dispatch(setSelectedDrive(foundDrives[0], ContentType.tv));
    }

    if (!movieSelectedDrive && foundDrives.length > 0) {
      dispatch(setSelectedDrive(foundDrives[0], ContentType.movie));
    }
  }, [
    tvSelectedDrive,
    movieSelectedDrive,
    dispatch,
    foundDrives,
    fetchLocalDisks,
  ]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const settings: BasicSettings = {
      tvTemplate: tvPathTemplate,
      movieTemplate: moviePathTemplate,
      tvSelectedDrive: tvSelectedDisk,
      movieSelectedDrive: movieSelectedDisk,
      tmdbApiKey: TMDBApiKey,
    };

    dispatch(setBasicSettings(settings));
  };

  return (
    <form onSubmit={handleSave} className={styles.form}>
      <FormatInput
        foundDrives={foundDrives}
        label="TV format:"
        setPathTemplate={(t: string) => setTvPathTemplate(t)}
        setSelectedDisk={(sd: string) => setTvSelectedDisk(sd)}
        template={tvPathTemplate}
        selectedDrive={tvSelectedDisk}
      />
      <FormatInput
        foundDrives={foundDrives}
        label="Movie format:"
        setPathTemplate={(t: string) => setMoviePathTemplate(t)}
        setSelectedDisk={(sd: string) => setMovieSelectedDisk(sd)}
        template={moviePathTemplate}
        selectedDrive={movieSelectedDisk}
      />
      <div className={styles.formGroup}>
        <label htmlFor="tmdb-api-key">
          <span> The movie database API key</span>
          <input
            type="text"
            id="tmdb-api-key"
            value={TMDBApiKey}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTMDBApiKey(e.target.value)
            }
          />
        </label>
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default SettingsForm;
