import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import child from 'child_process';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

import styles from './Settings.module.scss';
import { GlobalContext } from '../../contexts/GlobalContext';

import localStorage from '../../../temp_dev_storage.json';

const Settings: React.FC = () => {
  const {
    setRenameTemplate,
    files,
    setFoundDisks,
    foundDisks,
    selectedDisk,
    setSelectedDisk,
    renameTemplate,
  } = useContext(GlobalContext);
  const [fileTemplatePath, setFileTemplatePath] = useState(
    localStorage.settings.path
  );

  const [TMDBApiKey, setTMDBApiKey] = useState('');
  const [offlineMode, setOfflineMode] = useState(true);

  const fetchLocalDisks = useCallback(() => {
    child.exec('wmic logicaldisk get name', (error, stdout) => {
      if (error) {
        console.log('Error while fetching disks', error);
        // TODO: log to file
      }
      const connectedDisks = stdout
        .split('\r\r\n')
        .filter((value) => /[A-Za-z]:/.test(value))
        .map((value) => value.trim());

      if (connectedDisks.length > 0) {
        setFoundDisks(connectedDisks);
      } else {
        // TODO: log to file
        console.log('No disks found');
      }
    });
  }, [setFoundDisks]);

  useEffect(() => {
    if (!foundDisks.length) {
      fetchLocalDisks();
    }

    if (files.length > 0) {
      setSelectedDisk(files[0].path.disk);
    }
  }, [files, setSelectedDisk, foundDisks, fetchLocalDisks]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setRenameTemplate(`${selectedDisk}/${fileTemplatePath}`);
    console.log(TMDBApiKey);
  };

  console.log(selectedDisk);

  return (
    <main className={styles.settings}>
      <LeftNavbar currentlyActive="settings" />
      <div className={styles.core}>
        <h1>Settings</h1>

        <form onSubmit={handleSave} className={styles.form}>
          <div className={styles.formGroup}>
            {foundDisks.length > 0 && (
              <select
                name="disk"
                id="disk"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedDisk(e.target.value)
                }
                defaultValue={selectedDisk}
              >
                {foundDisks.map((disk: string) => (
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
          <div className={styles.formGroup}>
            <label htmlFor="offline-mode">
              Offline Mode{' '}
              <input
                type="checkbox"
                id="offline-mode"
                checked={offlineMode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOfflineMode(!!e.target.value)
                }
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tmdb-api-key">
              The movie database API key
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
          <button
            type="submit"
            disabled={renameTemplate === `${selectedDisk}/${fileTemplatePath}`}
          >
            save
          </button>
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
