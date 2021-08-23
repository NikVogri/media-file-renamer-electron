import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConnectedDrives } from '../../lib/systemHelper';
import {
  setFoundDrives,
  setPathTemplate,
  setSelectedDrive,
} from '../../redux/actions/settingsActtionsCreator';
import { RootState } from '../../redux/store';

import styles from './Settings.module.scss';

import localStorage from '../../../temp_dev_storage.json';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedDrive, foundDrives, files, template } = useSelector(
    (state: RootState) => ({
      selectedDrive: state.settings.selectedDrive,
      foundDrives: state.settings.foundDrives,
      files: state.file.files,
      template: state.settings.template,
    })
  );

  const [fileTemplatePath, setFileTemplatePath] = useState('');
  const [selectedDisk, setSelectedDisk] = useState('');

  const [TMDBApiKey, setTMDBApiKey] = useState('');
  const [offlineMode, setOfflineMode] = useState(true);

  const fetchLocalDisks = useCallback(async () => {
    const connectedDrives = await getConnectedDrives();

    dispatch(setFoundDrives(connectedDrives));
  }, [dispatch]);

  useEffect(() => {
    if (template) {
      setFileTemplatePath(template);
    }

    if (!foundDrives.length) {
      fetchLocalDisks();
    }

    if (!selectedDrive && foundDrives.length > 0 && files.length < 1) {
      dispatch(setSelectedDrive(foundDrives[0]));
    }

    if (!selectedDrive && files.length > 0) {
      dispatch(setSelectedDrive(files[0].path.disk));
    }
  }, [dispatch, fetchLocalDisks, files, foundDrives, selectedDrive, template]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setPathTemplate(fileTemplatePath));
    dispatch(setSelectedDrive(selectedDisk));
  };

  return (
    <main className={styles.settings}>
      <LeftNavbar currentlyActive="settings" />
      <div className={styles.core}>
        <h1>Settings</h1>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={`${styles.formGroup} ${styles.mapping}`}>
            <span>Route & title mapping</span>
            <div>
              {foundDrives.length > 0 && (
                <select
                  name="disk"
                  id="disk"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedDisk(e.target.value)
                  }
                  defaultValue={
                    typeof selectedDrive === 'string' ? selectedDrive : ''
                  }
                >
                  {foundDrives.map((disk: string) => (
                    <option value={disk} key={disk}>
                      {disk}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="text"
                id="template"
                value={fileTemplatePath}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFileTemplatePath(e.target.value)
                }
              />
            </div>
          </div>
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
          <div className={styles.formGroup}>
            <label htmlFor="offline-mode">
              <div>
                Offline Mode{' '}
                <input
                  type="checkbox"
                  id="offline-mode"
                  checked={offlineMode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setOfflineMode(!!e.target.value)
                  }
                />
              </div>
            </label>
          </div>
          <button type="submit">save</button>
        </form>
        <hr />
        <h3>Examples</h3>
        <p>
          C:/movies/&#123;title&#125; - &#123;year&#125; -&gt;
          C:/movies/GoodFellas - 1990
        </p>
        <p>
          C:/tv shows/&#123;title&#125;/season
          &#123;season&#125;/&#123;title&#125; - &#123;year&#125; -&gt; C:/tv
          shows/Game Of Thrones/season 1/Winter Is Coming
        </p>
        <hr />
        <h3>Valid mappings</h3>
        <p>&#123;title&#125; -&gt; Sherlock</p>
        <p>&#123;episodeTitle&#125; -&gt; A Study In Pink</p>
        <p>&#123;year&#125; -&gt; 2010</p>
        <p>&#123;pSeason&#125; -&gt; 01</p>
        <p>&#123;season&#125; -&gt; 1</p>
        <p>&#123;pEpisode&#125; -&gt; 01</p>
        <p>&#123;episode&#125; -&gt; 1</p>
      </div>
    </main>
  );
};

export default Settings;
