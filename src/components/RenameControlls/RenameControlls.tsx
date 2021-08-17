import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './RenameControlls.module.scss';

import ArrowRight from '../../../assets/icons/arrow_right.svg';
import SettingsIcon from '../../../assets/icons/settings_icon.svg';
import Clear from '../../../assets/icons/clear.svg';
import Check from '../../../assets/icons/check.svg';

import { GlobalContext } from '../../contexts/GlobalContext';
import { FileManager } from '../../lib/FileManager';

const RenameControlls: React.FC = () => {
  const { convertFiles, files, clearFiles } = useContext(GlobalContext);

  const handleRename = () => convertFiles();
  const handleClearItems = () => clearFiles();
  const handleMove = () => {
    console.log('moving files');
  };

  const filesWereEdited = files.every((file: FileManager) => file.edited);

  return (
    <>
      <div className={styles.rename_controlls}>
        {!filesWereEdited ? (
          <img
            src={ArrowRight}
            alt="Start converting"
            title="Preview"
            onClick={handleRename}
          />
        ) : (
          <img src={Check} alt="Confirm" title="Confirm" onClick={handleMove} />
        )}
        <Link to="/settings">
          <img
            src={SettingsIcon}
            alt="Show settings"
            title="Configure translation settings"
          />
        </Link>
        {files.length > 0 && (
          <img src={Clear} alt="Clear items" onClick={handleClearItems} />
        )}
      </div>
    </>
  );
};

export default RenameControlls;
