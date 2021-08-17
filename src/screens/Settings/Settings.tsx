import React, { FormEvent, useContext, useEffect, useState } from 'react';
import child from 'child_process';
import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

import styles from './Settings.module.scss';
import { GlobalContext } from '../../contexts/GlobalContext';

import localStorage from '../../../temp_dev_storage.json';

const Settings: React.FC = () => {
  const { setRenameTemplate } = useContext(GlobalContext);
  const [disks, setDisks] = useState<string[]>([]);
  const [selectedDisk, setSelectedDisk] = useState(disks[0]);
  const [fileTemplatePath, setFileTemplatePath] = useState(
    localStorage.settings.path
  );

  useEffect(() => {
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
        setDisks(connectedDisks);
        setSelectedDisk(connectedDisks[0]);
      } else {
        console.log('No disks found');
      }
    });
  }, []);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setRenameTemplate(`${selectedDisk}/${fileTemplatePath}`);
  };

  return (
    <main className={styles.settings}>
      <LeftNavbar currentlyActive="settings" />
      <div className={styles.core}>
        <h1>Settings</h1>
        <div className={styles.flex}>
          <div>
            <form onSubmit={handleSave} className={styles.form}>
              {disks.length > 0 && (
                <select
                  name="disk"
                  id="disk"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedDisk(e.target.value)
                  }
                  defaultValue={selectedDisk}
                >
                  {disks.map((disk: string) => (
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
              <button type="submit">save</button>
            </form>
            <hr />
            <h3>examples</h3>
            <p>
              C:/movies/&#123;title&#125; - &#123;year&#125; -&gt;
              C:/movies/GoodFellas - 1990
            </p>
            <p>
              C:/tv shows/&#123;title&#125;/season
              &#123;season&#125;/&#123;title&#125; - &#123;year&#125; -&gt;
              C:/tv shows/Game Of Thrones/season 1/Winter Is Coming
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;
